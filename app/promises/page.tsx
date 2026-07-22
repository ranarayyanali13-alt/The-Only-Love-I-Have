'use client';

import { useEffect, useMemo, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import NavigationButton from '@/components/NavigationButton';

type PromiseItem = {
  number: string;
  title: string;
  text: string;
  quote: string;
  icon: string;
};

const promises: PromiseItem[] = [
  {
    number: '01',
    title: 'I Will Never Become A Difficulty In Your Life',
    text: 'Agar kabhi hamare raste alag ho gaye, main tumhari zindagi mein wapas aa kar koi mushkil paida nahi karunga. Main tumhari peace, future aur happiness ka hamesha respect karunga. Mohabbat ka matlab sirf kisi ko apne paas rakhna nahi hota, kabhi kabhi uski zindagi ko aasaan rehne dena bhi hota hai.',
    quote: 'I will never turn our memories into a burden for your future.',
    icon: '☾',
  },
  {
    number: '02',
    title: 'Your Trust Will Always Remain Safe With Me',
    text: 'Tumne jo chats, pictures, calls aur personal moments mere saath share kiye, woh mere paas hamesha safe rahenge. Main kabhi tumhari privacy ya trust ko hurt nahi karunga. Jo tumne mujhe diya, woh mere liye amanat hai, aur amanat ka respect mere liye har cheez se zyada important hai.',
    quote: 'What you trusted me with will never belong to the world.',
    icon: '✦',
  },
  {
    number: '03',
    title: 'I Will Try To Stay Happy',
    text: 'Main promise karta hoon ke agar kabhi tum meri zindagi ka daily part na bhi raho, tab bhi main khud ko completely sadness mein lose nahi karunga. Mushkil hoga, lekin main khush rehne ki koshish karunga, kyun ke main jaanta hoon tum bhi mujhe toot kar nahi dekhna chahogi.',
    quote: 'I will carry the memory, but I will not destroy myself with it.',
    icon: '☀',
  },
  {
    number: '04',
    title: 'I Will Remember You For My Whole Life',
    text: 'Waqt badal sakta hai, log badal sakte hain, routines badal sakti hain, lekin tumhari jagah meri memory mein hamesha rahegi. Tum meri life ka ek aisa chapter ho jo sirf close ho sakta hai, erase nahi. Main tumhein sirf naam se nahi, ek feeling ki tarah yaad rakhunga.',
    quote: 'Some people leave the moment, but never leave the heart.',
    icon: '♡',
  },
  {
    number: '05',
    title: 'I Will Always Pray For Your Happiness',
    text: 'Chahe future mein hum baat karein ya na karein, main tumhare liye hamesha achi dua karunga. Main chahta hoon tum safe raho, successful raho, mentally peaceful raho aur tumhari life tumhein woh sab de jo tum deserve karti ho.',
    quote: 'Even from far away, I will always want life to be kind to you.',
    icon: '✧',
  },
  {
    number: '06',
    title: 'You Will Remain My Last Love',
    text: 'Tum meri aakhri mohabbat ho. Tumhare baad main kisi aur love story ki talash nahi karunga. Jo jagah dil ne tumhein di, woh kisi aur ko dena mere liye possible nahi. Future mein sirf meri wife ki jagah hogi, aur aage barhne ka decision bhi main tumhari baat aur tumhari dua ki respect mein karunga.',
    quote: 'No one will replace what you became to me.',
    icon: '∞',
  },
  {
    number: '07',
    title: 'I Will Respect Every Ending',
    text: 'Agar destiny ne humein alag direction mein bhej diya, main us ending ka respect karunga. Main force, pressure, guilt ya emotional burden create nahi karunga. Main sirf itna chahta hoon ke tum jab bhi mujhe yaad karo, tumhein ek real aur respectful love yaad aaye.',
    quote: 'Real love knows when to hold on, and when to let go with respect.',
    icon: '—',
  },
];

export default function PromisesPage() {
  const [loaded, setLoaded] = useState(false);
  const [activePromise, setActivePromise] = useState(0);

  const particles = useMemo(
    () =>
      Array.from({ length: 38 }, (_, index) => ({
        left: `${(index * 27.4) % 100}%`,
        top: `${(index * 41.8) % 100}%`,
        delay: `${index * 0.27}s`,
        duration: `${8 + (index % 5)}s`,
        size: 1 + (index % 2),
      })),
    []
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoaded(true);
    }, 250);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <PageLayout eyebrow="Chapter Six — My Promises">
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(224,185,93,0.1),transparent_38%)]" />

        <div className="absolute -left-64 top-[20%] h-[620px] w-[620px] rounded-full bg-amber-500/[0.045] blur-[190px]" />

        <div className="absolute -right-64 bottom-[10%] h-[620px] w-[620px] rounded-full bg-yellow-100/[0.04] blur-[190px]" />

        {particles.map((particle, index) => (
          <span
            key={index}
            className="dust-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.24)_56%,black_100%)]" />
      </div>

      <section className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div
          className={`
            mx-auto
            max-w-5xl
            transition-all
            duration-[1800ms]
            ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-14 opacity-0'}
          `}
        >
          <p className="text-[9px] uppercase tracking-[0.75em] text-yellow-200/60">
            Chapter VI
          </p>

          <h1 className="luxury-title mt-8 text-6xl leading-[0.88] text-white sm:text-7xl md:text-9xl">
            The Promises
            <br />
            <span className="gold-text italic">I Will Keep</span>
          </h1>

          <div className="mx-auto mt-10 flex max-w-sm items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-2xl text-yellow-100">♡</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <p className="mx-auto mt-10 max-w-2xl font-serif text-lg font-light leading-9 text-white/45 sm:text-xl">
            Kuch promises saath rehne ke liye nahi hote.
            <br />
            Kuch promises izzat, trust aur yaad ko protect karne ke liye hote
            hain.
          </p>

          <button
            type="button"
            onClick={() => {
              document.getElementById('promise-cards')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
            className="group mt-16 inline-flex flex-col items-center gap-4 text-white/25 transition-colors duration-500 hover:text-yellow-100"
          >
            <span className="text-[8px] uppercase tracking-[0.55em]">
              Read My Promises
            </span>

            <span className="flex h-12 w-7 justify-center rounded-full border border-white/15 pt-2">
              <span className="h-2 w-px animate-bounce bg-yellow-200/65" />
            </span>
          </button>
        </div>
      </section>

      <section
        id="promise-cards"
        className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8"
      >
        <div className="mb-16 text-center">
          <p className="text-[8px] uppercase tracking-[0.65em] text-yellow-200/55">
            Seven Promises
          </p>

          <h2 className="luxury-title mt-6 text-4xl leading-tight text-white sm:text-5xl md:text-7xl">
            Not Written For A Moment
            <br />
            <span className="gold-text italic">Written For A Lifetime</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {promises.map((promise, index) => {
            const active = activePromise === index;

            return (
              <button
                key={promise.number}
                type="button"
                onClick={() => {
                  setActivePromise(index);
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[38px]
                  border
                  p-8
                  text-left
                  shadow-[0_28px_80px_rgba(0,0,0,0.4)]
                  backdrop-blur-2xl
                  transition-all
                  duration-700
                  sm:p-10
                  ${
                    active
                      ? 'border-yellow-200/35 bg-yellow-100/[0.055] -translate-y-2'
                      : 'border-white/[0.09] bg-white/[0.025] hover:-translate-y-2 hover:border-yellow-200/25'
                  }
                `}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-100/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.55em] text-yellow-200/55">
                        Promise {promise.number}
                      </p>

                      <h3 className="luxury-title mt-5 text-3xl leading-tight text-white sm:text-4xl">
                        {promise.title}
                      </h3>
                    </div>

                    <div
                      className={`
                        flex
                        h-16
                        w-16
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        font-serif
                        text-3xl
                        transition-all
                        duration-700
                        ${
                          active
                            ? 'border-yellow-100/35 bg-yellow-200/[0.08] text-yellow-100 shadow-[0_0_55px_rgba(225,184,88,0.18)]'
                            : 'border-white/[0.08] bg-white/[0.025] text-white/35'
                        }
                      `}
                    >
                      {promise.icon}
                    </div>
                  </div>

                  <div className="mt-8 h-px w-24 bg-gradient-to-r from-yellow-200/70 to-transparent" />

                  <p className="mt-8 font-serif text-lg leading-9 text-white/48">
                    {promise.text}
                  </p>

                  <blockquote
                    className={`
                      relative
                      mt-9
                      border-l
                      border-yellow-200/25
                      pl-6
                      font-serif
                      text-xl
                      italic
                      leading-8
                      text-yellow-100/85
                      transition-all
                      duration-700
                      ${
                        active
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-4 opacity-55'
                      }
                    `}
                  >
                    “{promise.quote}”
                  </blockquote>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/[0.055] blur-[190px]" />

        <div className="relative mx-auto w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-[46px] border border-yellow-200/20 bg-gradient-to-br from-yellow-100/[0.06] via-white/[0.025] to-transparent px-7 py-16 text-center shadow-[0_40px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,229,157,0.11),transparent_45%)]" />

            <div className="relative z-10">
              <p className="text-[9px] uppercase tracking-[0.7em] text-yellow-200/60">
                Final Promise
              </p>

              <h2 className="luxury-title mt-8 text-5xl leading-[0.95] text-white sm:text-6xl md:text-8xl">
                No Matter What
                <br />
                <span className="gold-text italic">You Will Be Remembered</span>
              </h2>

              <div className="mx-auto mt-10 flex max-w-xs items-center gap-4">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

                <span className="font-serif text-2xl text-yellow-100">☾</span>

                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
              </div>

              <p className="mx-auto mt-10 max-w-3xl font-serif text-lg font-light leading-9 text-white/48 sm:text-xl">
                Agar ek din hamari conversations ruk jayein, hamare raste alag
                ho jayein aur life humein door le jaye, to kabhi ye mat sochna
                ke tum bhool di gayi ho.
              </p>

              <p className="mx-auto mt-7 max-w-2xl font-serif text-xl leading-9 text-white/45 sm:text-2xl">
                Kuch log haath se door ho jate hain, lekin dil se kabhi nahi
                jate.
              </p>

              <blockquote className="mx-auto mt-12 max-w-2xl font-serif text-3xl italic leading-tight text-yellow-100 sm:text-4xl">
                You will always be my Guggoo.
              </blockquote>

              <p className="mx-auto mt-8 max-w-xl font-serif text-lg italic leading-8 text-white/40">
                Forever respected. Forever remembered. Forever special.
              </p>

              <div className="mt-16">
                <NavigationButton
                  href="/forever"
                  label="One Last Celebration"
                  loadingLabel="Preparing The Sky..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
