'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function WelcomeOverlay() {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleContinue = () => {
    if (isLeaving) return;

    setIsLeaving(true);

    window.setTimeout(() => {
      router.push('/forever');
    }, 700);
  };

  return (
    <section
      className={`
        pointer-events-auto
        fixed
        inset-0
        z-50
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-black
        px-6
        transition-all
        duration-700
        ${isLeaving ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}
      `}
    >
      {/* Background glow */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-blue-500/5
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.55)_70%,black_100%)]
          "
        />
      </div>

      {/* Main content */}

      <div
        className="
          pointer-events-auto
          relative
          z-[60]
          mx-auto
          flex
          w-full
          max-w-3xl
          flex-col
          items-center
          text-center
        "
      >
        <p
          className="
            text-[11px]
            font-light
            uppercase
            tracking-[0.75em]
            text-blue-200/80
            sm:text-xs
          "
        >
          Welcome
        </p>

        <h1
          className="
            mt-7
            font-serif
            text-6xl
            font-light
            tracking-tight
            text-white
            sm:text-7xl
            md:text-8xl
          "
        >
          Guggoo
        </h1>

        <div
          className="
            mt-10
            h-px
            w-48
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
        />

        <div
          className="
            mt-10
            space-y-4
            font-serif
            text-lg
            leading-8
            text-blue-200/90
            sm:text-xl
          "
        >
          <p>You found the words...</p>

          <p>that my heart had been waiting to hear.</p>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={isLeaving}
          className="
            pointer-events-auto
            relative
            z-[100]
            mt-16
            flex
            min-h-[58px]
            min-w-[160px]
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border
            border-white/25
            bg-black/40
            px-10
            py-4
            font-serif
            text-base
            text-white
            backdrop-blur-md
            transition-all
            duration-500
            hover:border-white/70
            hover:bg-white
            hover:text-black
            active:scale-95
            disabled:cursor-wait
            disabled:opacity-60
          "
        >
          {isLeaving ? 'Opening...' : 'Continue'}
        </button>
      </div>
    </section>
  );
}
