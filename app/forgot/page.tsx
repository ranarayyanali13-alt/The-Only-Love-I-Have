'use client';

import PageLayout from '@/components/PageLayout';
import NavigationButton from '@/components/NavigationButton';

const forgotten = [
  {
    title: '10 June',
    text:
      'Maybe you forgot the day you said “I Love You Sunny.” I still remember the happiness, the excitement and every little feeling attached to that moment.',
  },
  {
    title: 'Your Videos',
    text:
      'You may not know it, but I used to watch your videos every morning. They quietly became part of my routine and one of the first things that made my day feel complete.',
  },
  {
    title: 'The Chillies Promise',
    text:
      'The day you asked me not to hurt myself by eating chillies again, I promised you I would stop. From that day until now, I have kept that promise because your concern mattered to me.',
  },
  {
    title: 'The Day I Felt Helpless',
    text:
      'The day you hurt your hand after I asked you not to, I was upset because seeing you in pain made me feel helpless. I never wanted to control you. I only wanted you safe.',
  },
  {
    title: 'My Intentions',
    text:
      'If I ever said something that hurt you, please know it was never my intention. My heart has always wanted your peace, your smile and your happiness.',
  },
];

export default function ForgotPage() {
  return (
    <PageLayout eyebrow="Chapter Seven — Things We Forgot">
      <section className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-[35%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/[0.05] blur-[180px]" />

        <div className="relative mx-auto max-w-5xl">
          <p className="text-[9px] uppercase tracking-[0.75em] text-yellow-200/60">
            Chapter VII
          </p>

          <h1 className="luxury-title mt-8 text-6xl leading-[0.9] text-white sm:text-7xl md:text-9xl">
            Things You May
            <br />

            <span className="gold-text italic">
              Have Forgotten
            </span>
          </h1>

          <div className="mx-auto mt-10 flex max-w-sm items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-2xl text-yellow-100">
              ☾
            </span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <p className="mx-auto mt-10 max-w-2xl font-serif text-lg font-light leading-9 text-white/45 sm:text-xl">
            Maybe some moments became ordinary for you.
            <br />
            For me, they quietly became unforgettable.
          </p>

          <button
            type="button"
            onClick={() => {
              document
                .getElementById('forgotten-moments')
                ?.scrollIntoView({
                  behavior: 'smooth',
                });
            }}
            className="group mt-16 inline-flex flex-col items-center gap-4 text-white/25 transition-colors duration-500 hover:text-yellow-100"
          >
            <span className="text-[8px] uppercase tracking-[0.55em]">
              Remember Them With Me
            </span>

            <span className="flex h-12 w-7 justify-center rounded-full border border-white/15 pt-2">
              <span className="h-2 w-px animate-bounce bg-yellow-200/65" />
            </span>
          </button>
        </div>
      </section>

      <section
        id="forgotten-moments"
        className="relative z-10 mx-auto max-w-6xl px-6 py-24"
      >
        <div className="grid gap-8 md:grid-cols-2">
          {forgotten.map((item, index) => (
            <article
              key={item.title}
              className="
                group
                relative
                overflow-hidden
                rounded-[36px]
                border
                border-white/[0.09]
                bg-white/[0.025]
                p-8
                shadow-[0_28px_80px_rgba(0,0,0,0.4)]
                backdrop-blur-2xl
                transition-all
                duration-700
                hover:-translate-y-2
                hover:border-yellow-200/30
                hover:bg-yellow-100/[0.045]
                sm:p-10
              "
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-100/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-5">
                  <p className="text-[8px] uppercase tracking-[0.55em] text-yellow-200/60">
                    Memory {String(index + 1).padStart(2, '0')}
                  </p>

                  <span className="font-serif text-2xl text-yellow-100/70">
                    ♡
                  </span>
                </div>

                <h2 className="luxury-title mt-7 text-4xl leading-tight text-white">
                  {item.title}
                </h2>

                <div className="mt-8 h-px w-24 bg-gradient-to-r from-yellow-200/70 to-transparent" />

                <p className="mt-8 font-serif text-lg leading-9 text-white/48">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/[0.05] blur-[180px]" />

        <div className="relative mx-auto max-w-4xl">
          <p className="text-[9px] uppercase tracking-[0.7em] text-yellow-200/55">
            Some Things Never Left Me
          </p>

          <h2 className="luxury-title mt-8 text-5xl leading-[0.95] text-white sm:text-6xl md:text-8xl">
            Maybe You Forgot
            <br />

            <span className="gold-text italic">
              But My Heart Did Not
            </span>
          </h2>

          <div className="mx-auto mt-10 flex max-w-xs items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-2xl text-yellow-100">
              ♡
            </span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <p className="mx-auto mt-9 max-w-2xl font-serif text-lg font-light leading-9 text-white/45 sm:text-xl">
            These were not just moments.
            <br />
            They became habits, promises and feelings that still live inside me.
          </p>

          <div className="mt-14">
            <NavigationButton
              href="/sorry"
              label="One Honest Chapter"
              loadingLabel="Opening My Apology..."
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
