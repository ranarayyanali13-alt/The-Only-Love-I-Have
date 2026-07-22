'use client';

import { useCallback, useEffect, useRef } from 'react';

type FireworkColor = {
  main: string;
  soft: string;
};

type Rocket = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  velocityX: number;
  velocityY: number;
  trail: TrailPoint[];
  color: FireworkColor;
  size: number;
  exploded: boolean;
  type: ExplosionType;
};

type Particle = {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  velocityX: number;
  velocityY: number;
  gravity: number;
  friction: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
  glow: string;
  trail: TrailPoint[];
  twinkle: boolean;
  twinkleSpeed: number;
};

type Spark = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  gravity: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
};

type TrailPoint = {
  x: number;
  y: number;
  alpha: number;
};

type FloatingHeart = {
  x: number;
  y: number;
  size: number;
  velocityY: number;
  sway: number;
  phase: number;
  alpha: number;
};

type ExplosionType =
  | 'circle'
  | 'double'
  | 'ring'
  | 'willow'
  | 'heart'
  | 'crown';

const COLORS: FireworkColor[] = [
  {
    main: '#ffe29a',
    soft: 'rgba(255, 226, 154, 0.9)',
  },
  {
    main: '#ffffff',
    soft: 'rgba(255, 255, 255, 0.92)',
  },
  {
    main: '#f7c96d',
    soft: 'rgba(247, 201, 109, 0.9)',
  },
  {
    main: '#fff4cf',
    soft: 'rgba(255, 244, 207, 0.92)',
  },
  {
    main: '#e8ad45',
    soft: 'rgba(232, 173, 69, 0.88)',
  },
];

const EXPLOSION_TYPES: ExplosionType[] = [
  'circle',
  'circle',
  'double',
  'ring',
  'willow',
  'heart',
  'crown',
];

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const heartsRef = useRef<FloatingHeart[]>([]);

  const lastLaunchTimeRef = useRef(0);
  const lastHeartTimeRef = useRef(0);
  const finaleStartedRef = useRef(false);
  const finaleEndTimeRef = useRef(0);

  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const devicePixelRatioRef = useRef(1);

  const createRocket = useCallback(
    (
      forcedX?: number,
      forcedTargetX?: number,
      forcedTargetY?: number,
      forcedType?: ExplosionType
    ) => {
      const width = widthRef.current;
      const height = heightRef.current;

      if (!width || !height) {
        return;
      }

      const startX = forcedX ?? random(width * 0.12, width * 0.88);

      const targetX = forcedTargetX ?? random(width * 0.12, width * 0.88);

      const targetY = forcedTargetY ?? random(height * 0.08, height * 0.48);

      const distanceX = targetX - startX;
      const distanceY = targetY - height;
      const distance = Math.hypot(distanceX, distanceY);

      const speed = random(8.5, 11.5);

      rocketsRef.current.push({
        x: startX,
        y: height + 15,
        targetX,
        targetY,
        velocityX: (distanceX / distance) * speed,
        velocityY: (distanceY / distance) * speed,
        trail: [],
        color: randomItem(COLORS),
        size: random(1.6, 2.6),
        exploded: false,
        type: forcedType ?? randomItem(EXPLOSION_TYPES),
      });
    },
    []
  );

  const createParticle = useCallback(
    (
      x: number,
      y: number,
      angle: number,
      speed: number,
      color: FireworkColor,
      options?: {
        gravity?: number;
        friction?: number;
        decay?: number;
        size?: number;
        twinkle?: boolean;
      }
    ): Particle => {
      return {
        x,
        y,
        previousX: x,
        previousY: y,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        gravity: options?.gravity ?? random(0.035, 0.075),
        friction: options?.friction ?? random(0.972, 0.987),
        alpha: 1,
        decay: options?.decay ?? random(0.007, 0.014),
        size: options?.size ?? random(1.1, 2.4),
        color: color.main,
        glow: color.soft,
        trail: [],
        twinkle: options?.twinkle ?? Math.random() > 0.55,
        twinkleSpeed: random(0.08, 0.22),
      };
    },
    []
  );

  const createExplosionSparks = useCallback(
    (x: number, y: number, color: FireworkColor, amount = 28) => {
      for (let index = 0; index < amount; index += 1) {
        const angle = random(0, Math.PI * 2);
        const speed = random(0.8, 4.8);

        sparksRef.current.push({
          x,
          y,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          gravity: random(0.035, 0.09),
          alpha: random(0.55, 1),
          decay: random(0.018, 0.04),
          size: random(0.7, 1.8),
          color: Math.random() > 0.35 ? color.main : '#ffffff',
        });
      }
    },
    []
  );

  const explodeCircle = useCallback(
    (rocket: Rocket, multiplier = 1) => {
      const count = Math.floor(random(95, 145) * multiplier);

      for (let index = 0; index < count; index += 1) {
        const angle = (Math.PI * 2 * index) / count + random(-0.035, 0.035);

        const speed = random(2.4, 7.2) * multiplier;

        particlesRef.current.push(
          createParticle(rocket.x, rocket.y, angle, speed, rocket.color)
        );
      }

      createExplosionSparks(rocket.x, rocket.y, rocket.color, 36);
    },
    [createExplosionSparks, createParticle]
  );

  const explodeDouble = useCallback(
    (rocket: Rocket) => {
      const count = 92;

      for (let ring = 0; ring < 2; ring += 1) {
        for (let index = 0; index < count; index += 1) {
          const angle = (Math.PI * 2 * index) / count;

          const speed = ring === 0 ? random(2.2, 3.9) : random(5.2, 7.5);

          const color = ring === 0 ? COLORS[1] : rocket.color;

          particlesRef.current.push(
            createParticle(rocket.x, rocket.y, angle, speed, color, {
              decay: ring === 0 ? random(0.011, 0.017) : random(0.007, 0.012),
            })
          );
        }
      }

      createExplosionSparks(rocket.x, rocket.y, rocket.color, 45);
    },
    [createExplosionSparks, createParticle]
  );

  const explodeRing = useCallback(
    (rocket: Rocket) => {
      const count = 150;
      const tilt = random(0.35, 0.72);

      for (let index = 0; index < count; index += 1) {
        const angle = (Math.PI * 2 * index) / count;

        const speed = random(5.2, 6.8);

        const particle = createParticle(
          rocket.x,
          rocket.y,
          angle,
          speed,
          rocket.color,
          {
            gravity: random(0.025, 0.055),
            decay: random(0.008, 0.013),
            size: random(1.2, 2.2),
          }
        );

        particle.velocityY *= tilt;

        particlesRef.current.push(particle);
      }

      createExplosionSparks(rocket.x, rocket.y, rocket.color, 30);
    },
    [createExplosionSparks, createParticle]
  );

  const explodeWillow = useCallback(
    (rocket: Rocket) => {
      const count = 180;

      for (let index = 0; index < count; index += 1) {
        const angle = random(0, Math.PI * 2);
        const speed = random(2.5, 6.4);

        particlesRef.current.push(
          createParticle(rocket.x, rocket.y, angle, speed, rocket.color, {
            gravity: random(0.07, 0.115),
            friction: random(0.982, 0.992),
            decay: random(0.0045, 0.0085),
            size: random(1, 2.1),
            twinkle: true,
          })
        );
      }

      createExplosionSparks(rocket.x, rocket.y, rocket.color, 42);
    },
    [createExplosionSparks, createParticle]
  );

  const explodeHeart = useCallback(
    (rocket: Rocket) => {
      const count = 190;
      const heartScale = random(0.33, 0.48);

      for (let index = 0; index < count; index += 1) {
        const t = (Math.PI * 2 * index) / count;

        const heartX = 16 * Math.pow(Math.sin(t), 3);

        const heartY =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);

        const velocityX = heartX * heartScale;
        const velocityY = -heartY * heartScale;

        const particle = createParticle(
          rocket.x,
          rocket.y,
          0,
          0,
          rocket.color,
          {
            gravity: random(0.018, 0.045),
            friction: random(0.982, 0.991),
            decay: random(0.0065, 0.011),
            size: random(1.3, 2.5),
            twinkle: true,
          }
        );

        particle.velocityX = velocityX + random(-0.16, 0.16);

        particle.velocityY = velocityY + random(-0.16, 0.16);

        particlesRef.current.push(particle);
      }

      createExplosionSparks(rocket.x, rocket.y, rocket.color, 55);
    },
    [createExplosionSparks, createParticle]
  );

  const explodeCrown = useCallback(
    (rocket: Rocket) => {
      const count = 170;

      for (let index = 0; index < count; index += 1) {
        const progress = index / count;

        const angle = Math.PI * 1.08 + progress * Math.PI * 0.84;

        const speed = random(3.8, 8.3);

        particlesRef.current.push(
          createParticle(rocket.x, rocket.y, angle, speed, rocket.color, {
            gravity: random(0.065, 0.11),
            friction: random(0.978, 0.989),
            decay: random(0.006, 0.011),
            size: random(1.1, 2.4),
          })
        );
      }

      createExplosionSparks(rocket.x, rocket.y, rocket.color, 50);
    },
    [createExplosionSparks, createParticle]
  );

  const explodeRocket = useCallback(
    (rocket: Rocket) => {
      switch (rocket.type) {
        case 'double':
          explodeDouble(rocket);
          break;

        case 'ring':
          explodeRing(rocket);
          break;

        case 'willow':
          explodeWillow(rocket);
          break;

        case 'heart':
          explodeHeart(rocket);
          break;

        case 'crown':
          explodeCrown(rocket);
          break;

        default:
          explodeCircle(rocket);
      }
    },
    [
      explodeCircle,
      explodeCrown,
      explodeDouble,
      explodeHeart,
      explodeRing,
      explodeWillow,
    ]
  );

  const createFloatingHeart = useCallback(() => {
    const width = widthRef.current;
    const height = heightRef.current;

    if (!width || !height) {
      return;
    }

    heartsRef.current.push({
      x: random(width * 0.08, width * 0.92),
      y: height + 40,
      size: random(7, 16),
      velocityY: random(0.25, 0.65),
      sway: random(0.3, 1.1),
      phase: random(0, Math.PI * 2),
      alpha: random(0.12, 0.32),
    });
  }, []);

  const startGrandFinale = useCallback(() => {
    if (finaleStartedRef.current) {
      return;
    }

    finaleStartedRef.current = true;
    finaleEndTimeRef.current = performance.now() + 6200;

    const width = widthRef.current;
    const height = heightRef.current;

    const launches: Array<{
      delay: number;
      x: number;
      targetX: number;
      targetY: number;
      type: ExplosionType;
    }> = [
      {
        delay: 0,
        x: width * 0.1,
        targetX: width * 0.22,
        targetY: height * 0.28,
        type: 'willow',
      },
      {
        delay: 180,
        x: width * 0.9,
        targetX: width * 0.78,
        targetY: height * 0.26,
        type: 'willow',
      },
      {
        delay: 500,
        x: width * 0.28,
        targetX: width * 0.36,
        targetY: height * 0.18,
        type: 'double',
      },
      {
        delay: 720,
        x: width * 0.72,
        targetX: width * 0.64,
        targetY: height * 0.18,
        type: 'double',
      },
      {
        delay: 1100,
        x: width * 0.5,
        targetX: width * 0.5,
        targetY: height * 0.25,
        type: 'heart',
      },
      {
        delay: 1800,
        x: width * 0.05,
        targetX: width * 0.15,
        targetY: height * 0.42,
        type: 'ring',
      },
      {
        delay: 2000,
        x: width * 0.95,
        targetX: width * 0.85,
        targetY: height * 0.4,
        type: 'ring',
      },
      {
        delay: 2650,
        x: width * 0.32,
        targetX: width * 0.28,
        targetY: height * 0.32,
        type: 'crown',
      },
      {
        delay: 2800,
        x: width * 0.68,
        targetX: width * 0.72,
        targetY: height * 0.3,
        type: 'crown',
      },
      {
        delay: 3500,
        x: width * 0.5,
        targetX: width * 0.5,
        targetY: height * 0.12,
        type: 'heart',
      },
      {
        delay: 4200,
        x: width * 0.18,
        targetX: width * 0.36,
        targetY: height * 0.22,
        type: 'willow',
      },
      {
        delay: 4300,
        x: width * 0.82,
        targetX: width * 0.64,
        targetY: height * 0.22,
        type: 'willow',
      },
    ];

    launches.forEach((launch) => {
      window.setTimeout(() => {
        createRocket(launch.x, launch.targetX, launch.targetY, launch.type);
      }, launch.delay);
    });

    window.setTimeout(() => {
      finaleStartedRef.current = false;
    }, 7600);
  }, [createRocket]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d', {
      alpha: true,
    });

    if (!context) {
      return;
    }

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      const width = window.innerWidth;
      const height = window.innerHeight;

      widthRef.current = width;
      heightRef.current = height;
      devicePixelRatioRef.current = ratio;

      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawHeart = (x: number, y: number, size: number, alpha: number) => {
      context.save();
      context.translate(x, y);
      context.scale(size / 28, size / 28);

      context.beginPath();
      context.moveTo(0, 8);
      context.bezierCurveTo(-18, -6, -18, -20, 0, -9);
      context.bezierCurveTo(18, -20, 18, -6, 0, 8);

      context.strokeStyle = `rgba(255, 220, 145, ${alpha})`;

      context.lineWidth = 1.2;
      context.stroke();
      context.restore();
    };

    const updateRocket = (rocket: Rocket) => {
      rocket.trail.unshift({
        x: rocket.x,
        y: rocket.y,
        alpha: 1,
      });

      if (rocket.trail.length > 12) {
        rocket.trail.pop();
      }

      rocket.trail.forEach((point) => {
        point.alpha *= 0.84;
      });

      rocket.x += rocket.velocityX;
      rocket.y += rocket.velocityY;

      rocket.velocityY += 0.018;

      const distanceToTarget = Math.hypot(
        rocket.targetX - rocket.x,
        rocket.targetY - rocket.y
      );

      if (distanceToTarget < 12 || rocket.velocityY >= -0.5) {
        rocket.exploded = true;
        explodeRocket(rocket);
      }
    };

    const drawRocket = (rocket: Rocket) => {
      context.save();

      rocket.trail.forEach((point, index) => {
        const progress = 1 - index / rocket.trail.length;

        context.beginPath();
        context.arc(
          point.x,
          point.y,
          Math.max(0.4, rocket.size * progress),
          0,
          Math.PI * 2
        );

        context.fillStyle = `rgba(255, 226, 154, ${point.alpha * progress})`;

        context.fill();
      });

      context.shadowBlur = 18;
      context.shadowColor = rocket.color.main;

      context.beginPath();
      context.arc(rocket.x, rocket.y, rocket.size, 0, Math.PI * 2);

      context.fillStyle = '#ffffff';
      context.fill();

      context.restore();
    };

    const updateParticle = (particle: Particle, time: number) => {
      particle.previousX = particle.x;
      particle.previousY = particle.y;

      particle.trail.unshift({
        x: particle.x,
        y: particle.y,
        alpha: particle.alpha,
      });

      if (particle.trail.length > 7) {
        particle.trail.pop();
      }

      particle.velocityX *= particle.friction;
      particle.velocityY *= particle.friction;
      particle.velocityY += particle.gravity;

      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      particle.alpha -= particle.decay;

      if (particle.twinkle) {
        const pulse =
          Math.sin(time * particle.twinkleSpeed * 0.1) * 0.18 + 0.82;

        particle.alpha *= Math.max(0.75, pulse);
      }
    };

    const drawParticle = (particle: Particle) => {
      context.save();

      context.globalCompositeOperation = 'lighter';

      particle.trail.forEach((point, index) => {
        const progress = 1 - index / particle.trail.length;

        if (index === 0) {
          return;
        }

        const previous = particle.trail[index - 1];

        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.lineTo(point.x, point.y);

        context.strokeStyle = particle.glow.replace(
          /[\d.]+\)$/,
          `${Math.max(0, particle.alpha * progress * 0.34)})`
        );

        context.lineWidth = particle.size * progress * 0.65;

        context.stroke();
      });

      context.shadowBlur = particle.size * 7;

      context.shadowColor = particle.glow;

      context.beginPath();
      context.arc(
        particle.x,
        particle.y,
        Math.max(0.25, particle.size),
        0,
        Math.PI * 2
      );

      context.fillStyle = particle.color;
      context.globalAlpha = Math.max(0, particle.alpha);

      context.fill();
      context.restore();
    };

    const updateSpark = (spark: Spark) => {
      spark.x += spark.velocityX;
      spark.y += spark.velocityY;
      spark.velocityX *= 0.97;
      spark.velocityY *= 0.97;
      spark.velocityY += spark.gravity;
      spark.alpha -= spark.decay;
    };

    const drawSpark = (spark: Spark) => {
      context.save();
      context.globalCompositeOperation = 'lighter';
      context.globalAlpha = Math.max(0, spark.alpha);

      context.shadowBlur = 9;
      context.shadowColor = spark.color;

      context.beginPath();
      context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);

      context.fillStyle = spark.color;
      context.fill();
      context.restore();
    };

    const updateHeart = (heart: FloatingHeart, time: number) => {
      heart.y -= heart.velocityY;

      heart.x += Math.sin(time * 0.0008 + heart.phase) * heart.sway * 0.16;

      heart.alpha -= 0.0009;
    };

    const animate = (time: number) => {
      const width = widthRef.current;
      const height = heightRef.current;

      context.globalCompositeOperation = 'source-over';

      context.fillStyle = 'rgba(0, 0, 0, 0.19)';
      context.fillRect(0, 0, width, height);

      const isGrandFinale =
        finaleStartedRef.current && time < finaleEndTimeRef.current;

      const launchDelay = isGrandFinale
        ? random(180, 360)
        : width < 640
        ? random(850, 1350)
        : random(620, 1050);

      if (time - lastLaunchTimeRef.current > launchDelay) {
        const simultaneousLaunches = isGrandFinale
          ? Math.floor(random(2, 4))
          : Math.random() > 0.78
          ? 2
          : 1;

        for (let index = 0; index < simultaneousLaunches; index += 1) {
          createRocket();
        }

        lastLaunchTimeRef.current = time;
      }

      if (time - lastHeartTimeRef.current > 700) {
        createFloatingHeart();
        lastHeartTimeRef.current = time;
      }

      rocketsRef.current.forEach((rocket) => {
        updateRocket(rocket);
        drawRocket(rocket);
      });

      rocketsRef.current = rocketsRef.current.filter(
        (rocket) => !rocket.exploded
      );

      particlesRef.current.forEach((particle) => {
        updateParticle(particle, time);
        drawParticle(particle);
      });

      particlesRef.current = particlesRef.current.filter(
        (particle) => particle.alpha > 0 && particle.y < height + 150
      );

      sparksRef.current.forEach((spark) => {
        updateSpark(spark);
        drawSpark(spark);
      });

      sparksRef.current = sparksRef.current.filter((spark) => spark.alpha > 0);

      heartsRef.current.forEach((heart) => {
        updateHeart(heart, time);
        drawHeart(heart.x, heart.y, heart.size, heart.alpha);
      });

      heartsRef.current = heartsRef.current.filter(
        (heart) => heart.alpha > 0 && heart.y > -50
      );

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    const handlePointer = (event: PointerEvent) => {
      const targetX = event.clientX;
      const targetY = Math.min(event.clientY, heightRef.current * 0.72);

      createRocket(
        targetX + random(-80, 80),
        targetX,
        targetY,
        Math.random() > 0.72 ? 'heart' : randomItem(EXPLOSION_TYPES)
      );
    };

    const handleFinaleEvent = () => {
      startGrandFinale();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameRef.current) {
          window.cancelAnimationFrame(animationFrameRef.current);

          animationFrameRef.current = null;
        }
      } else if (!animationFrameRef.current) {
        lastLaunchTimeRef.current = performance.now();

        animationFrameRef.current = window.requestAnimationFrame(animate);
      }
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('pointerdown', handlePointer);

    window.addEventListener('start-grand-finale', handleFinaleEvent);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    lastLaunchTimeRef.current = performance.now();

    lastHeartTimeRef.current = performance.now();

    animationFrameRef.current = window.requestAnimationFrame(animate);

    const openingTimers = [
      window.setTimeout(() => {
        createRocket(
          widthRef.current * 0.2,
          widthRef.current * 0.3,
          heightRef.current * 0.3,
          'willow'
        );
      }, 500),

      window.setTimeout(() => {
        createRocket(
          widthRef.current * 0.8,
          widthRef.current * 0.7,
          heightRef.current * 0.27,
          'double'
        );
      }, 900),

      window.setTimeout(() => {
        createRocket(
          widthRef.current * 0.5,
          widthRef.current * 0.5,
          heightRef.current * 0.18,
          'heart'
        );
      }, 1500),
    ];

    return () => {
      openingTimers.forEach((timer) => {
        window.clearTimeout(timer);
      });

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      window.removeEventListener('resize', resizeCanvas);

      window.removeEventListener('pointerdown', handlePointer);

      window.removeEventListener('start-grand-finale', handleFinaleEvent);

      document.removeEventListener('visibilitychange', handleVisibilityChange);

      rocketsRef.current = [];
      particlesRef.current = [];
      sparksRef.current = [];
      heartsRef.current = [];
    };
  }, [createFloatingHeart, createRocket, explodeRocket, startGrandFinale]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
