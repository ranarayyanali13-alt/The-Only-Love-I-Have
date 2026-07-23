'use client';

import { useEffect, useRef } from 'react';

type Rocket = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
  type: 'circle' | 'ring' | 'heart' | 'willow';
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  gravity: number;
  friction: number;
  size: number;
  color: string;
  glow: boolean;
};

const COLORS = [
  '#fff7d6',
  '#ffe9a8',
  '#ffd36b',
  '#ffffff',
  '#f5b942',
];

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function SmoothFireworks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });

    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let animationFrame = 0;
    let lastFrame = 0;
    let lastLaunch = 0;

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    const isMobile = width < 768;

    const maxParticles = isMobile ? 550 : 900;
    const frameInterval = 1000 / 60;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        isMobile ? 1.25 : 1.5,
      );

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0,
      );
    }

    function addParticle(
      x: number,
      y: number,
      vx: number,
      vy: number,
      color: string,
      options?: {
        gravity?: number;
        decay?: number;
        friction?: number;
        size?: number;
        glow?: boolean;
      },
    ) {
      if (particles.length >= maxParticles) {
        particles.splice(
          0,
          Math.min(40, particles.length),
        );
      }

      particles.push({
        x,
        y,
        vx,
        vy,
        alpha: 1,
        decay:
          options?.decay ??
          random(0.011, 0.019),
        gravity:
          options?.gravity ??
          random(0.035, 0.065),
        friction:
          options?.friction ??
          random(0.973, 0.985),
        size:
          options?.size ??
          random(1.2, 2.3),
        color,
        glow: options?.glow ?? false,
      });
    }

    function createRocket(
      targetX?: number,
      targetY?: number,
      forcedType?: Rocket['type'],
    ) {
      const startX = random(
        width * 0.12,
        width * 0.88,
      );

      const finalX =
        targetX ??
        random(width * 0.15, width * 0.85);

      const finalY =
        targetY ??
        random(height * 0.12, height * 0.5);

      const dx = finalX - startX;
      const dy = finalY - height;
      const distance = Math.hypot(dx, dy);

      const speed = random(8.7, 11.2);

      const types: Rocket['type'][] = [
        'circle',
        'circle',
        'ring',
        'willow',
        'heart',
      ];

      rockets.push({
        x: startX,
        y: height + 12,
        targetX: finalX,
        targetY: finalY,
        vx: (dx / distance) * speed,
        vy: (dy / distance) * speed,
        color: randomColor(),
        exploded: false,
        type:
          forcedType ??
          types[
            Math.floor(
              Math.random() * types.length,
            )
          ],
      });
    }

    function circleExplosion(rocket: Rocket) {
      const amount = isMobile ? 72 : 105;

      for (let i = 0; i < amount; i++) {
        const angle =
          (Math.PI * 2 * i) / amount +
          random(-0.025, 0.025);

        const speed = random(2.6, 6.8);

        addParticle(
          rocket.x,
          rocket.y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          rocket.color,
          {
            glow: i % 5 === 0,
          },
        );
      }
    }

    function ringExplosion(rocket: Rocket) {
      const amount = isMobile ? 78 : 120;

      for (let i = 0; i < amount; i++) {
        const angle =
          (Math.PI * 2 * i) / amount;

        const speed = random(4.8, 6.2);

        addParticle(
          rocket.x,
          rocket.y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed * 0.58,
          rocket.color,
          {
            gravity: 0.035,
            decay: random(0.01, 0.016),
          },
        );
      }
    }

    function willowExplosion(rocket: Rocket) {
      const amount = isMobile ? 95 : 140;

      for (let i = 0; i < amount; i++) {
        const angle = random(0, Math.PI * 2);
        const speed = random(2.4, 6);

        addParticle(
          rocket.x,
          rocket.y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          rocket.color,
          {
            gravity: random(0.075, 0.11),
            friction: 0.987,
            decay: random(0.006, 0.01),
            size: random(1, 2),
          },
        );
      }
    }

    function heartExplosion(rocket: Rocket) {
      const amount = isMobile ? 95 : 145;
      const scale = isMobile ? 0.28 : 0.36;

      for (let i = 0; i < amount; i++) {
        const t =
          (Math.PI * 2 * i) / amount;

        const heartX =
          16 * Math.pow(Math.sin(t), 3);

        const heartY =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);

        addParticle(
          rocket.x,
          rocket.y,
          heartX * scale,
          -heartY * scale,
          rocket.color,
          {
            gravity: 0.03,
            friction: 0.988,
            decay: random(0.008, 0.013),
            size: random(1.3, 2.2),
            glow: i % 8 === 0,
          },
        );
      }
    }

    function explode(rocket: Rocket) {
      if (rocket.type === 'ring') {
        ringExplosion(rocket);
        return;
      }

      if (rocket.type === 'willow') {
        willowExplosion(rocket);
        return;
      }

      if (rocket.type === 'heart') {
        heartExplosion(rocket);
        return;
      }

      circleExplosion(rocket);
    }

    function drawRocket(rocket: Rocket) {
      ctx.save();

      ctx.globalCompositeOperation = 'lighter';

      ctx.strokeStyle = rocket.color;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.moveTo(
        rocket.x - rocket.vx * 2.5,
        rocket.y - rocket.vy * 2.5,
      );
      ctx.lineTo(rocket.x, rocket.y);
      ctx.stroke();

      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(
        rocket.x,
        rocket.y,
        2,
        0,
        Math.PI * 2,
      );

      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    }

    function drawParticle(particle: Particle) {
      ctx.save();

      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = Math.max(
        0,
        particle.alpha,
      );

      if (particle.glow) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
      }

      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2,
      );

      ctx.fillStyle = particle.color;
      ctx.fill();

      ctx.restore();
    }

    function updateRockets() {
      for (
        let i = rockets.length - 1;
        i >= 0;
        i--
      ) {
        const rocket = rockets[i];

        rocket.x += rocket.vx;
        rocket.y += rocket.vy;
        rocket.vy += 0.014;

        drawRocket(rocket);

        const distance = Math.hypot(
          rocket.targetX - rocket.x,
          rocket.targetY - rocket.y,
        );

        if (
          distance < 14 ||
          rocket.vy > -0.6
        ) {
          explode(rocket);
          rockets.splice(i, 1);
        }
      }
    }

    function updateParticles() {
      for (
        let i = particles.length - 1;
        i >= 0;
        i--
      ) {
        const particle = particles[i];

        particle.vx *= particle.friction;
        particle.vy *= particle.friction;
        particle.vy += particle.gravity;

        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.alpha -= particle.decay;

        drawParticle(particle);

        if (
          particle.alpha <= 0 ||
          particle.y > height + 80
        ) {
          particles.splice(i, 1);
        }
      }
    }

    function grandFinale() {
      const launches = [
        {
          delay: 0,
          x: width * 0.2,
          y: height * 0.32,
          type: 'willow' as const,
        },
        {
          delay: 180,
          x: width * 0.8,
          y: height * 0.3,
          type: 'willow' as const,
        },
        {
          delay: 620,
          x: width * 0.35,
          y: height * 0.2,
          type: 'ring' as const,
        },
        {
          delay: 800,
          x: width * 0.65,
          y: height * 0.2,
          type: 'ring' as const,
        },
        {
          delay: 1250,
          x: width * 0.5,
          y: height * 0.22,
          type: 'heart' as const,
        },
        {
          delay: 1900,
          x: width * 0.25,
          y: height * 0.4,
          type: 'circle' as const,
        },
        {
          delay: 2050,
          x: width * 0.75,
          y: height * 0.4,
          type: 'circle' as const,
        },
        {
          delay: 2600,
          x: width * 0.5,
          y: height * 0.12,
          type: 'heart' as const,
        },
      ];

      launches.forEach(item => {
        window.setTimeout(() => {
          createRocket(
            item.x,
            item.y,
            item.type,
          );
        }, item.delay);
      });
    }

    function animate(time: number) {
      animationFrame =
        window.requestAnimationFrame(animate);

      if (time - lastFrame < frameInterval) {
        return;
      }

      lastFrame = time;

      ctx.globalCompositeOperation =
        'source-over';

      ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
      ctx.fillRect(0, 0, width, height);

      const launchDelay = isMobile ? 1050 : 780;

      if (time - lastLaunch > launchDelay) {
        createRocket();

        if (Math.random() > 0.78) {
          window.setTimeout(() => {
            createRocket();
          }, 160);
        }

        lastLaunch = time;
      }

      updateRockets();
      updateParticles();
    }

    function handlePointer(
      event: PointerEvent,
    ) {
      createRocket(
        event.clientX,
        Math.min(
          event.clientY,
          height * 0.7,
        ),
        Math.random() > 0.6
          ? 'heart'
          : 'circle',
      );
    }

    function handleGrandFinale() {
      grandFinale();
    }

    resize();

    window.addEventListener('resize', resize);
    window.addEventListener(
      'pointerdown',
      handlePointer,
    );
    window.addEventListener(
      'smooth-grand-finale',
      handleGrandFinale,
    );

    animationFrame =
      window.requestAnimationFrame(animate);

    window.setTimeout(() => {
      createRocket(
        width * 0.3,
        height * 0.3,
        'willow',
      );
    }, 350);

    window.setTimeout(() => {
      createRocket(
        width * 0.7,
        height * 0.28,
        'ring',
      );
    }, 700);

    window.setTimeout(() => {
      createRocket(
        width * 0.5,
        height * 0.19,
        'heart',
      );
    }, 1200);

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );

      window.removeEventListener(
        'resize',
        resize,
      );

      window.removeEventListener(
        'pointerdown',
        handlePointer,
      );

      window.removeEventListener(
        'smooth-grand-finale',
        handleGrandFinale,
      );

      rockets.length = 0;
      particles.length = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-black"
      aria-hidden="true"
    />
  );
}