'use client';

import { useEffect, useState } from 'react';
import NavigationButton from '@/components/NavigationButton';
import PageLayout from '@/components/PageLayout';

export default function WelcomePage() {
  const [showLabel, setShowLabel] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showLines, setShowLines] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => {
        setShowLabel(true);
      }, 400),

      window.setTimeout(() => {
        setShowName(true);
      }, 1300),

      window.setTimeout(() => {
        setShowLines(true);
      }, 2500),

      window.setTimeout(() => {
        setShowButton(true);
      }, 3900),
    ];

    return () => {
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, []);

  return (
    <PageLayout showProgress={false} pageClassName="overflow-hidden">
      <section className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-20">
        {/* Moon background */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[35%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/[0.055] blur-[180px]" />

          <div className="absolute left-1/2 top-[35%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-100/[0.06]" />

          <div className="absolute left-1/2 top-[35%] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.88)_100%)]" />
        </div>

        {/* Crescent moon */}

        <div
          className={`
            pointer-events-none
            absolute
            left-1/2
            top-[30%]
            -translate-x-1/2
            -translate-y-1/2
            transition-all
            duration-[1800ms]
            ${showLabel ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
          `}
        >
          <div className="floating-slow relative">
            <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-100/10 blur-[80px]" />

            <svg
              width="185"
              height="185"
              viewBox="0 0 220 220"
              className="drop-shadow-[0_0_38px_rgba(255,230,170,0.25)]"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="welcomeMoon" cx="30%" cy="24%">
                  <stop offset="0%" stopColor="#fffdf4" />

                  <stop offset="48%" stopColor="#f0d79e" />

                  <stop offset="100%" stopColor="#a8742d" />
                </radialGradient>
              </defs>

              <circle cx="110" cy="110" r="70" fill="url(#welcomeMoon)" />

              <circle cx="141" cy="88" r="64" fill="#020202" />
            </svg>

            <span className="absolute -left-5 top-5 animate-pulse text-lg text-yellow-100">
              ✦
            </span>

            <span
              className="absolute -right-7 bottom-9 animate-pulse text-sm text-white/70"
              style={{
                animationDelay: '1.1s',
              }}
            >
              ✧
            </span>
          </div>
        </div>

        {/* Main content */}

        <div className="relative z-20 mx-auto mt-40 flex w-full max-w-5xl flex-col items-center text-center sm:mt-44">
          <p
            className={`
              text-[9px]
              uppercase
              tracking-[0.8em]
              text-yellow-200/65
              transition-all
              duration-[1500ms]
              ${
                showLabel
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-5 opacity-0'
              }
            `}
          >
            The Moon Remembered Your Name
          </p>

          <div
            className={`
              mt-8
              transition-all
              duration-[1800ms]
              ${
                showName
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-12 scale-95 opacity-0'
              }
            `}
          >
            <p className="mb-4 text-[8px] uppercase tracking-[0.7em] text-white/25">
              Welcome
            </p>

            <h1 className="luxury-title gold-text text-[72px] leading-[0.85] sm:text-[105px] md:text-[145px]">
              Guggoo
            </h1>
          </div>

          <div
            className={`
              mx-auto
              mt-10
              flex
              w-full
              max-w-sm
              items-center
              gap-5
              transition-all
              duration-[1500ms]
              ${showLines ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
            `}
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-xl text-yellow-100">☾</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <div
            className={`
              mt-9
              max-w-2xl
              transition-all
              duration-[1700ms]
              ${
                showLines
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }
            `}
          >
            <p className="font-serif text-xl font-light leading-9 text-white/48 sm:text-2xl sm:leading-10">
              Some stories are read.
            </p>

            <p className="mt-3 font-serif text-2xl italic leading-9 text-yellow-100/90 sm:text-3xl">
              Ours was always meant to be felt.
            </p>

            <p className="mx-auto mt-7 max-w-xl font-serif text-base leading-8 text-white/35 sm:text-lg">
              It began quietly, with a name in a crowded group, and slowly
              became one of the most important chapters of my life.
            </p>
          </div>

          <div
            className={`
              mt-12
              transition-all
              duration-[1400ms]
              ${
                showButton
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }
            `}
          >
            <NavigationButton
              href="/journey"
              label="Begin Our Journey"
              loadingLabel="Opening Our Story..."
            />
          </div>
        </div>

        {/* Bottom date */}

        <div
          className={`
            pointer-events-none
            absolute
            bottom-7
            left-1/2
            -translate-x-1/2
            text-center
            transition-all
            delay-700
            duration-[1500ms]
            ${showButton ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <p className="text-[8px] uppercase tracking-[0.55em] text-white/20">
            26 November
          </p>

          <span className="mx-auto mt-3 block h-7 w-px bg-gradient-to-b from-yellow-200/35 to-transparent" />
        </div>
      </section>
    </PageLayout>
  );
}
