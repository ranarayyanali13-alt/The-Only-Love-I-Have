'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/PageLayout';

export default function EndPage() {
  const router = useRouter();

  const [showMoon, setShowMoon] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, index) => ({
        left: `${(index * 31.4) % 100}%`,
        top: `${(index * 47.9) % 100}%`,
        size: 1 + (index % 3),
        delay: `${(index % 18) * 0.3}s`,
        duration: `${4 + (index % 6)}s`,
      })),
    []
  );

  useEffect(() => {
    const timers = [
      window.setTimeout(() => {
        setShowMoon(true);
      }, 400),

      window.setTimeout(() => {
        setShowTitle(true);
      }, 1500),

      window.setTimeout(() => {
        setShowMessage(true);
      }, 2900),

      window.setTimeout(() => {
        setShowSignature(true);
      }, 4500),

      window.setTimeout(() => {
        setShowButton(true);
      }, 5700),
    ];

    return () => {
      timers.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, []);

  function restartExperience() {
    if (isRestarting) return;

    setIsRestarting(true);

    window.setTimeout(() => {
      router.push('/');
    }, 1200);
  }

  return (
    <PageLayout
      showProgress={false}
      pageClassName={`
        overflow-hidden
        transition-all
        duration-1000
        ${
          isRestarting
            ? 'scale-105 opacity-0 blur-md'
            : 'scale-100 opacity-100 blur-0'
        }
      `}
    >
      <section className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-black px-6 py-20 text-center">
        {/* Stars */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {stars.map((star, index) => (
            <span
              key={index}
              className="star"
              style={{
                left: star.left,
                top: star.top,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>

        {/* Moon glow */}

        <div
          className={`
            pointer-events-none
            absolute
            left-1/2
            top-[26%]
            h-[520px]
            w-[520px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-yellow-100/[0.055]
            blur-[180px]
            transition-all
            duration-[2200ms]
            ${showMoon ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
          `}
        />

        {/* Moon */}

        <div
          className={`
            pointer-events-none
            absolute
            left-1/2
            top-[24%]
            -translate-x-1/2
            -translate-y-1/2
            transition-all
            duration-[2200ms]
            ${showMoon ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
          `}
        >
          <div className="floating-slow relative">
            <svg
              width="210"
              height="210"
              viewBox="0 0 220 220"
              className="drop-shadow-[0_0_50px_rgba(255,230,170,0.28)]"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="endMoonGradient" cx="30%" cy="24%">
                  <stop offset="0%" stopColor="#fffdf4" />

                  <stop offset="48%" stopColor="#f0d79e" />

                  <stop offset="100%" stopColor="#a8742d" />
                </radialGradient>
              </defs>

              <circle cx="110" cy="110" r="70" fill="url(#endMoonGradient)" />

              <circle cx="141" cy="88" r="64" fill="#000000" />
            </svg>

            <span className="absolute -left-7 top-7 animate-pulse text-xl text-yellow-100">
              ✦
            </span>

            <span
              className="absolute -right-8 bottom-11 animate-pulse text-sm text-white/70"
              style={{
                animationDelay: '1.2s',
              }}
            >
              ✧
            </span>
          </div>
        </div>

        {/* Vignette */}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,transparent_0%,rgba(0,0,0,0.22)_42%,rgba(0,0,0,0.92)_100%)]" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/70 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/85 to-transparent" />

        {/* Main content */}

        <div className="relative z-20 mx-auto mt-44 flex w-full max-w-5xl flex-col items-center sm:mt-52">
          <p
            className={`
              text-[9px]
              uppercase
              tracking-[0.8em]
              text-yellow-200/60
              transition-all
              duration-[1500ms]
              ${
                showTitle
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-6 opacity-0'
              }
            `}
          >
            The Last Chapter
          </p>

          <h1
            className={`
              luxury-title
              mt-8
              text-5xl
              leading-[0.92]
              text-white
              transition-all
              duration-[1800ms]
              sm:text-6xl
              md:text-8xl
              ${
                showTitle
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-10 scale-95 opacity-0'
              }
            `}
          >
            Some People
            <br />
            <span className="gold-text italic">Stay Forever</span>
          </h1>

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
              ${showMessage ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
            `}
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-2xl text-yellow-100">☾</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <div
            className={`
              mx-auto
              mt-10
              max-w-2xl
              transition-all
              duration-[1800ms]
              ${
                showMessage
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }
            `}
          >
            <p className="font-serif text-xl font-light leading-10 text-white/48 sm:text-2xl">
              Even when life changes,
              <br />
              even when conversations stop,
              <br />
              and even when people are no longer beside us...
            </p>

            <p className="mt-7 font-serif text-2xl italic leading-10 text-yellow-100/90 sm:text-3xl">
              Some memories never learn how to leave.
            </p>

            <p className="mx-auto mt-8 max-w-xl font-serif text-lg leading-9 text-white/38">
              What we had will always remain one of the most beautiful and
              unexpected chapters of my life.
            </p>
          </div>

          <div
            className={`
              mt-12
              transition-all
              duration-[1800ms]
              ${
                showSignature
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }
            `}
          >
            <p className="font-serif text-lg italic text-white/40">
              Made with every beat of my heart.
            </p>

            <p className="gold-text luxury-title mt-4 text-5xl italic sm:text-6xl">
              Rayyan
            </p>

            <div className="mx-auto mt-5 h-px w-36 bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent" />

            <p className="mt-5 text-[8px] uppercase tracking-[0.55em] text-white/22">
              For Guggoo — Always
            </p>
          </div>

          <div
            className={`
              mt-12
              transition-all
              duration-[1500ms]
              ${
                showButton
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }
            `}
          >
            <button
              type="button"
              onClick={restartExperience}
              disabled={isRestarting}
              className="
                group
                relative
                min-h-[58px]
                min-w-[210px]
                cursor-pointer
                overflow-hidden
                rounded-full
                border
                border-yellow-200/25
                bg-white/[0.025]
                px-10
                py-4
                font-serif
                text-white
                shadow-[0_18px_55px_rgba(0,0,0,0.45)]
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-yellow-100/60
                active:scale-[0.97]
                disabled:cursor-wait
              "
            >
              <span className="absolute inset-0 -translate-x-[105%] bg-gradient-to-r from-[#fff1bd] via-[#d9b45d] to-[#9f6c28] transition-transform duration-500 group-hover:translate-x-0" />

              <span className="relative z-10 flex items-center justify-center gap-3 transition-colors duration-500 group-hover:text-black">
                <span>
                  {isRestarting
                    ? 'Returning To The Beginning...'
                    : 'Experience It Again'}
                </span>

                <span>↺</span>
              </span>
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
