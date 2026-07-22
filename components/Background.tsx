'use client';

import { useMemo } from 'react';

type Star = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
};

type Dust = {
  left: string;
  top: string;
  delay: string;
  duration: string;
  size: number;
};

export default function Background() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 150 }, (_, index) => ({
      left: `${(index * 37.7) % 100}%`,
      top: `${(index * 61.3) % 100}%`,
      size: 1 + (index % 3),
      delay: `${(index % 18) * 0.28}s`,
      duration: `${3.2 + (index % 7) * 0.65}s`,
      opacity: 0.12 + (index % 5) * 0.08,
    }));
  }, []);

  const dustParticles = useMemo<Dust[]>(() => {
    return Array.from({ length: 28 }, (_, index) => ({
      left: `${(index * 19.4) % 100}%`,
      top: `${22 + ((index * 27.6) % 70)}%`,
      delay: `${index * 0.34}s`,
      duration: `${8 + (index % 5)}s`,
      size: 1 + (index % 2),
    }));
  }, []);

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* Base gradient */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(180deg,#050403_0%,#020202_54%,#000000_100%)]
        "
      />

      {/* Main golden light */}

      <div
        className="
          absolute
          left-1/2
          top-[-320px]
          h-[850px]
          w-[850px]
          -translate-x-1/2
          rounded-full
          bg-yellow-200/[0.07]
          blur-[190px]
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-[-230px]
          h-[610px]
          w-[610px]
          -translate-x-1/2
          rounded-full
          bg-amber-300/[0.045]
          blur-[145px]
        "
      />

      {/* Side glows */}

      <div
        className="
          home-glow
          absolute
          -left-72
          top-[20%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#7f2e25]/[0.085]
          blur-[185px]
        "
      />

      <div
        className="
          home-glow
          absolute
          -right-72
          bottom-[5%]
          h-[680px]
          w-[680px]
          rounded-full
          bg-[#b48943]/[0.07]
          blur-[195px]
          [animation-delay:-2.5s]
        "
      />

      {/* Central halo */}

      <div
        className="
          absolute
          left-1/2
          top-[43%]
          h-[560px]
          w-[560px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-yellow-100/[0.035]
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-[43%]
          h-[380px]
          w-[380px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/[0.025]
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-[43%]
          h-[230px]
          w-[230px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-yellow-100/[0.025]
          blur-[75px]
        "
      />

      {/* Light rays */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-[70%]
          w-[1px]
          -translate-x-1/2
          bg-gradient-to-b
          from-yellow-100/30
          via-yellow-200/[0.04]
          to-transparent
        "
      />

      <div
        className="
          absolute
          left-[27%]
          top-[-12%]
          h-[72%]
          w-[1px]
          rotate-[14deg]
          bg-gradient-to-b
          from-yellow-100/[0.11]
          to-transparent
          blur-[0.5px]
        "
      />

      <div
        className="
          absolute
          right-[27%]
          top-[-12%]
          h-[72%]
          w-[1px]
          -rotate-[14deg]
          bg-gradient-to-b
          from-yellow-100/[0.11]
          to-transparent
          blur-[0.5px]
        "
      />

      {/* Stars */}

      <div className="absolute inset-0">
        {stars.map((star, index) => (
          <span
            key={index}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* Golden dust */}

      <div className="absolute inset-0">
        {dustParticles.map((dust, index) => (
          <span
            key={index}
            className="dust-particle"
            style={{
              left: dust.left,
              top: dust.top,
              width: `${dust.size}px`,
              height: `${dust.size}px`,
              animationDelay: dust.delay,
              animationDuration: dust.duration,
            }}
          />
        ))}
      </div>

      {/* Film grain */}

      <div className="film-grain" />

      {/* Vignette */}

      <div className="vignette" />

      {/* Top and bottom fades */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-44
          bg-gradient-to-b
          from-black
          via-black/60
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-56
          bg-gradient-to-t
          from-black
          via-black/80
          to-transparent
        "
      />
    </div>
  );
}
