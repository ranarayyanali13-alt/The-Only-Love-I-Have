'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import Fireworks from '@/components/Fireworks';

export default function ForeverPage() {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [finaleStarted, setFinaleStarted] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        left: `${(index * 23.7) % 100}%`,
        delay: `${index * 0.42}s`,
        duration: `${8 + (index % 5)}s`,
        size: 10 + (index % 4) * 4,
      })),
    []
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoaded(true);
    }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  async function toggleMusic() {
    const audio = document.getElementById(
      'foreverMusic'
    ) as HTMLAudioElement | null;

    if (!audio) return;

    try {
      if (audio.paused) {
        audio.volume = 0.55;
        await audio.play();
        setMusicPlaying(true);
      } else {
        audio.pause();
        setMusicPlaying(false);
      }
    } catch {
      setMusicPlaying(false);
    }
  }

  function startFinale() {
    if (finaleStarted) return;

    setFinaleStarted(true);

    window.dispatchEvent(new Event('start-grand-finale'));

    window.setTimeout(() => {
      setShowFinalMessage(true);
    }, 2800);
  }

  function openLastPage() {
    if (isLeaving) return;

    setIsLeaving(true);

    window.dispatchEvent(new Event('start-grand-finale'));

    window.setTimeout(() => {
      router.push('/end');
    }, 4200);
  }

  return (
    <PageLayout
      eyebrow="Chapter Seven — Forever & Always"
      pageClassName={`
        overflow-hidden
        transition-all
        duration-1000
        ${
          isLeaving
            ? 'scale-105 opacity-0 blur-md'
            : 'scale-100 opacity-100 blur-0'
        }
      `}
    >
      <audio
        id="foreverMusic"
        src="/music/finale-song.mp3"
        loop
        preload="auto"
      />

      <Fireworks />

      {/* Dark overlays */}

      <div className="pointer-events-none fixed inset-0 z-[5] bg-black/25" />

      <div className="pointer-events-none fixed inset-0 z-[6] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.9)_100%)]" />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[7] h-52 bg-gradient-to-b from-black via-black/55 to-transparent" />

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[7] h-64 bg-gradient-to-t from-black via-black/75 to-transparent" />

      {/* Floating hearts */}

      <div className="pointer-events-none fixed inset-0 z-[8] overflow-hidden">
        {floatingHearts.map((heart, index) => (
          <span
            key={index}
            className="
              absolute
              bottom-[-40px]
              font-serif
              text-yellow-100/20
              animate-[foreverHeartFloat_linear_infinite]
            "
            style={{
              left: heart.left,
              fontSize: `${heart.size}px`,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
            }}
          >
            ♡
          </span>
        ))}
      </div>

      {/* Intro */}

      <section className="relative z-20 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/[0.055] blur-[200px]" />

        <div
          className={`
            relative
            mx-auto
            max-w-5xl
            transition-all
            duration-[1800ms]
            ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
          `}
        >
          <p className="text-[9px] uppercase tracking-[0.8em] text-yellow-200/65">
            Chapter VII
          </p>

          <h1 className="luxury-title mt-8 text-6xl leading-[0.86] text-white sm:text-7xl md:text-9xl">
            Forever
            <br />
            <span className="gold-text italic">&amp; Always</span>
          </h1>

          <div className="mx-auto mt-10 flex max-w-sm items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/45" />

            <span className="font-serif text-2xl text-yellow-100">♡</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/45" />
          </div>

          <p className="mx-auto mt-10 max-w-2xl font-serif text-lg font-light leading-9 text-white/48 sm:text-xl">
            Our story may not belong to forever.
            <br />
            But what it changed inside me always will.
          </p>

          <p className="mx-auto mt-6 max-w-xl font-serif text-2xl italic leading-9 text-yellow-100/90">
            Tonight, even the sky celebrates you.
          </p>

          <button
            type="button"
            onClick={() => {
              document.getElementById('forever-message')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
            className="group mt-16 inline-flex flex-col items-center gap-4 text-white/25 transition-colors duration-500 hover:text-yellow-100"
          >
            <span className="text-[8px] uppercase tracking-[0.55em]">
              Enter The Finale
            </span>

            <span className="flex h-12 w-7 justify-center rounded-full border border-white/15 pt-2">
              <span className="h-2 w-px animate-bounce bg-yellow-200/65" />
            </span>
          </button>
        </div>
      </section>

      {/* Main message */}

      <section
        id="forever-message"
        className="relative z-20 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center"
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/[0.05] blur-[200px]" />

        <div className="relative mx-auto max-w-4xl">
          <p className="text-[9px] uppercase tracking-[0.7em] text-yellow-200/60">
            Thank You, Guggoo
          </p>

          <h2 className="luxury-title mt-8 text-5xl leading-[0.94] text-white sm:text-6xl md:text-8xl">
            For Every Moment
            <br />
            <span className="gold-text italic">That Changed My Life</span>
          </h2>

          <div className="mx-auto mt-10 h-px w-60 bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent" />

          <div className="mx-auto mt-12 max-w-2xl space-y-6 font-serif text-lg font-light leading-9 text-white/48 sm:text-xl">
            <p>Thank you for 26 November.</p>

            <p>Thank you for 3 December.</p>

            <p>
              Thank you for that first message that made me happier than you
              could ever imagine.
            </p>

            <p>
              Thank you for every conversation, every call, every argument and
              every smile.
            </p>

            <p>
              Thank you for becoming the most beautiful and unexpected chapter
              of my life.
            </p>
          </div>

          <blockquote className="mx-auto mt-12 max-w-2xl font-serif text-2xl italic leading-10 text-yellow-100/90 sm:text-3xl">
            I had spoken to people before, but Guggoo was always something else.
            Something different.
          </blockquote>

          <button
            type="button"
            onClick={startFinale}
            disabled={finaleStarted}
            className="
              group
              relative
              mt-16
              min-h-[62px]
              min-w-[230px]
              cursor-pointer
              overflow-hidden
              rounded-full
              border
              border-yellow-200/30
              bg-black/35
              px-11
              py-4
              font-serif
              text-white
              shadow-[0_20px_70px_rgba(0,0,0,0.45)]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-yellow-100/70
              active:scale-[0.97]
              disabled:cursor-wait
            "
          >
            <span className="absolute inset-0 -translate-x-[105%] bg-gradient-to-r from-[#fff1bd] via-[#d9b45d] to-[#9f6c28] transition-transform duration-500 group-hover:translate-x-0" />

            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
              {finaleStarted ? 'Watch The Sky...' : 'Light Up The Sky'}
            </span>
          </button>
        </div>
      </section>

      {/* Final reveal */}

      <section className="relative z-20 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/[0.06] blur-[220px]" />

        <div
          className={`
            relative
            mx-auto
            max-w-5xl
            transition-all
            duration-[1800ms]
            ${
              showFinalMessage
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-16 scale-95 opacity-35'
            }
          `}
        >
          <p className="text-[9px] uppercase tracking-[0.75em] text-yellow-200/60">
            One Last Celebration
          </p>

          <h2 className="luxury-title mt-8 text-6xl leading-[0.88] text-white sm:text-7xl md:text-9xl">
            I Love You
            <br />
            <span className="gold-text italic">Bohat Sara</span>
          </h2>

          <div className="mx-auto mt-10 flex max-w-sm items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/45" />

            <span className="font-serif text-3xl text-yellow-100">♡</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/45" />
          </div>

          <p className="mx-auto mt-10 max-w-2xl font-serif text-xl font-light leading-10 text-white/50">
            No matter what name life gives our story, for me it will always be
            love.
          </p>

          <p className="mx-auto mt-7 max-w-xl font-serif text-3xl italic leading-tight text-yellow-100">
            Thank you for being my Guggoo.
          </p>

          <div className="mt-16">
            <button
              type="button"
              onClick={openLastPage}
              disabled={isLeaving}
              className="
                group
                relative
                min-h-[62px]
                min-w-[220px]
                cursor-pointer
                overflow-hidden
                rounded-full
                border
                border-yellow-200/30
                bg-black/40
                px-11
                py-4
                font-serif
                text-white
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-yellow-100/70
                active:scale-[0.97]
                disabled:cursor-wait
              "
            >
              <span className="absolute inset-0 -translate-x-[105%] bg-gradient-to-r from-[#fff1bd] via-[#d9b45d] to-[#9f6c28] transition-transform duration-500 group-hover:translate-x-0" />

              <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                {isLeaving ? 'One Final Explosion...' : 'One Last Page'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Music control */}

      <button
        type="button"
        onClick={toggleMusic}
        className="
          fixed
          bottom-5
          right-5
          z-[100]
          flex
          h-13
          w-13
          min-h-[52px]
          min-w-[52px]
          items-center
          justify-center
          rounded-full
          border
          border-white/15
          bg-black/50
          font-serif
          text-lg
          text-yellow-100
          shadow-[0_14px_50px_rgba(0,0,0,0.45)]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-yellow-200/50
          hover:bg-yellow-100
          hover:text-black
          active:scale-90
        "
        aria-label="Play or pause music"
      >
        {musicPlaying ? 'Ⅱ' : '♫'}
      </button>
    </PageLayout>
  );
}
