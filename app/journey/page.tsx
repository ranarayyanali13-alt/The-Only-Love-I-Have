'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import NavigationButton from '@/components/NavigationButton';
import PageLayout from '@/components/PageLayout';

type Scene = {
  date: string;
  chapter: string;
  title: string;
  lines: string[];
  accent: string;
  quote?: string;
  type: 'name' | 'question' | 'message' | 'conversation' | 'change' | 'counter';
};

const scenes: Scene[] = [
  {
    date: '26 November',
    chapter: 'Scene 01',
    title: 'One Name Stayed With Me',
    lines: [
      'A crowded group.',
      'Hundreds of messages.',
      'So many different people.',
      'And somehow...',
    ],
    accent: 'Hazel.',
    quote:
      'I noticed your name before I even knew whether you were a boy or a girl.',
    type: 'name',
  },
  {
    date: '26 November',
    chapter: 'Scene 02',
    title: 'A Simple Question',
    lines: [
      'I kept thinking about that name.',
      'Hazel...',
      'Larka hai?',
      'Ya larki?',
    ],
    accent: 'So I asked Majid.',
    quote:
      'It was only a question. I had no idea it was the beginning of everything.',
    type: 'question',
  },
  {
    date: '3 December',
    chapter: 'Scene 03',
    title: 'Then Your Message Appeared',
    lines: [
      'Six days later...',
      'A notification appeared.',
      'Your name was on my screen.',
      'And the first word was...',
    ],
    accent: 'Bhai...',
    quote: 'You probably never knew how happy that one message made me.',
    type: 'message',
  },
  {
    date: 'The Beginning',
    chapter: 'Scene 04',
    title: 'There Was No Plan',
    lines: [
      'No wrong intention.',
      'No hidden approach.',
      'No expectations.',
      'We simply started talking.',
    ],
    accent: 'And talking became a habit.',
    quote:
      'Ordinary conversations slowly became the most important part of my day.',
    type: 'conversation',
  },
  {
    date: 'Slowly',
    chapter: 'Scene 05',
    title: 'Everything Changed Quietly',
    lines: [
      'Bhai became familiarity.',
      'Familiarity became attachment.',
      'Attachment became something deeper.',
      'And before I understood it...',
    ],
    accent: 'It had become love.',
    quote: 'Ahista ahista woh sab ek muhabbat mein badal gaya.',
    type: 'change',
  },
  {
    date: '225 Days',
    chapter: 'Scene 06',
    title: 'You Were Different',
    lines: [
      'I had talked to people before.',
      'I had known other girls before.',
      'But you were never like anyone else.',
      'Guggoo was something different.',
    ],
    accent: 'You changed my life.',
    quote:
      'We did not only make memories. We created moments that will stay with me for life.',
    type: 'counter',
  },
];

export default function JourneyPage() {
  const [introVisible, setIntroVisible] = useState(true);
  const [activeScene, setActiveScene] = useState(0);
  const [dayCount, setDayCount] = useState(0);
  const [messageTyped, setMessageTyped] = useState('');

  const sceneRefs = useRef<Array<HTMLElement | null>>([]);

  const stars = useMemo(
    () =>
      Array.from({ length: 75 }, (_, index) => ({
        left: `${(index * 31.7) % 100}%`,
        top: `${(index * 47.3) % 100}%`,
        size: 1 + (index % 3),
        delay: `${(index % 14) * 0.35}s`,
        duration: `${4 + (index % 5)}s`,
      })),
    []
  );

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setIntroVisible(false);
    }, 2600);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sceneIndex = Number(entry.target.getAttribute('data-scene'));

          setActiveScene(sceneIndex);
        });
      },
      {
        threshold: 0.58,
      }
    );

    sceneRefs.current.forEach((scene) => {
      if (scene) observer.observe(scene);
    });

    return () => {
      window.clearTimeout(introTimer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeScene !== 2) {
      setMessageTyped('');
      return;
    }

    const message = 'Bhai...';
    let index = 0;

    const typingTimer = window.setInterval(() => {
      index += 1;
      setMessageTyped(message.slice(0, index));

      if (index >= message.length) {
        window.clearInterval(typingTimer);
      }
    }, 180);

    return () => {
      window.clearInterval(typingTimer);
    };
  }, [activeScene]);

  useEffect(() => {
    if (activeScene !== 5) {
      setDayCount(0);
      return;
    }

    let current = 0;
    const target = 225;

    const counter = window.setInterval(() => {
      current += 3;

      if (current >= target) {
        current = target;
        window.clearInterval(counter);
      }

      setDayCount(current);
    }, 24);

    return () => {
      window.clearInterval(counter);
    };
  }, [activeScene]);

  const scrollToScene = (index: number) => {
    sceneRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <PageLayout eyebrow="Chapter One — The Beginning">
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(230,190,100,0.08),transparent_36%)]" />

        <div className="absolute -left-64 top-[20%] h-[620px] w-[620px] rounded-full bg-amber-500/[0.045] blur-[190px]" />

        <div className="absolute -right-64 bottom-[10%] h-[620px] w-[620px] rounded-full bg-yellow-100/[0.035] blur-[190px]" />

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
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.28)_58%,black_100%)]" />
      </div>

      <div
        className={`
          fixed
          inset-0
          z-[200]
          flex
          items-center
          justify-center
          bg-black
          transition-all
          duration-1000
          ${
            introVisible
              ? 'visible opacity-100'
              : 'invisible scale-105 opacity-0'
          }
        `}
      >
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.8em] text-yellow-200/60">
            Chapter I
          </p>

          <h1 className="luxury-title mt-8 text-5xl text-white sm:text-7xl">
            The Beginning
          </h1>

          <div className="mx-auto mt-9 h-px w-44 bg-gradient-to-r from-transparent via-yellow-200/55 to-transparent" />

          <p className="mt-8 font-serif text-lg italic text-white/35">
            Before love had a name...
          </p>
        </div>
      </div>

      <aside className="fixed right-5 top-1/2 z-[80] hidden -translate-y-1/2 flex-col gap-5 lg:flex">
        {scenes.map((scene, index) => (
          <button
            key={scene.chapter}
            type="button"
            onClick={() => scrollToScene(index)}
            className="group flex items-center justify-end gap-4"
          >
            <span
              className={`
                text-[8px]
                uppercase
                tracking-[0.35em]
                transition-all
                duration-500
                ${
                  activeScene === index
                    ? 'translate-x-0 text-yellow-100 opacity-100'
                    : 'translate-x-3 text-white/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }
              `}
            >
              {scene.date}
            </span>

            <span
              className={`
                h-px
                transition-all
                duration-500
                ${
                  activeScene === index
                    ? 'w-10 bg-yellow-200'
                    : 'w-4 bg-white/20 group-hover:w-7'
                }
              `}
            />

            <span
              className={`
                font-serif
                text-xs
                ${activeScene === index ? 'text-yellow-100' : 'text-white/20'}
              `}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </aside>

      {scenes.map((scene, index) => {
        const active = activeScene === index;
        const reverse = index % 2 !== 0;

        return (
          <section
            key={scene.chapter}
            ref={(element) => {
              sceneRefs.current[index] = element;
            }}
            data-scene={index}
            className="
              relative
              z-10
              flex
              min-h-screen
              min-h-[100svh]
              items-center
              overflow-hidden
              px-6
              py-24
            "
          >
            <div
              className={`
                pointer-events-none
                absolute
                top-1/2
                h-[500px]
                w-[500px]
                -translate-y-1/2
                rounded-full
                bg-yellow-200/[0.045]
                blur-[160px]
                transition-all
                duration-[1800ms]
                ${reverse ? '-right-56' : '-left-56'}
                ${active ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
              `}
            />

            <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-28">
              <div
                className={`
                  relative
                  flex
                  min-h-[370px]
                  items-center
                  justify-center
                  transition-all
                  duration-[1500ms]
                  ${reverse ? 'lg:order-2' : ''}
                  ${
                    active
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-16 opacity-15'
                  }
                `}
              >
                <div className="absolute h-[300px] w-[300px] rounded-full border border-yellow-100/[0.08] bg-yellow-100/[0.015] shadow-[0_0_120px_rgba(220,180,90,0.06)] sm:h-[350px] sm:w-[350px]" />

                <div className="absolute h-[220px] w-[220px] rounded-full border border-white/[0.04] sm:h-[260px] sm:w-[260px]" />

                {scene.type === 'name' && (
                  <div className="relative text-center">
                    <p className="text-[9px] uppercase tracking-[0.6em] text-white/25">
                      One Name
                    </p>

                    <p className="gold-text luxury-title mt-5 text-7xl italic sm:text-8xl">
                      Hazel
                    </p>
                  </div>
                )}

                {scene.type === 'question' && (
                  <div className="relative text-center">
                    <p className="font-serif text-5xl text-white/90 sm:text-6xl">
                      ?
                    </p>

                    <p className="mt-7 font-serif text-xl italic text-yellow-100/75">
                      Larka hai ya larki?
                    </p>
                  </div>
                )}

                {scene.type === 'message' && (
                  <div className="relative w-full max-w-[280px]">
                    <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-100/20 bg-yellow-200/[0.05] font-serif text-yellow-100">
                          G
                        </div>

                        <div>
                          <p className="font-serif text-sm text-white">
                            Guggoo
                          </p>

                          <p className="text-[8px] uppercase tracking-[0.3em] text-white/25">
                            New message
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl rounded-tl-sm bg-white/[0.07] px-5 py-4">
                        <p className="font-serif text-xl text-white">
                          {messageTyped}
                          <span className="ml-1 inline-block h-5 w-px animate-pulse bg-yellow-100" />
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {scene.type === 'conversation' && (
                  <div className="relative flex flex-col gap-4">
                    {[
                      'Typing...',
                      'Talking...',
                      'Waiting...',
                      'Smiling...',
                    ].map((item, itemIndex) => (
                      <div
                        key={item}
                        className="
                            rounded-full
                            border
                            border-white/[0.08]
                            bg-white/[0.025]
                            px-7
                            py-3
                            text-center
                            font-serif
                            text-sm
                            text-white/45
                            backdrop-blur-xl
                          "
                        style={{
                          transform: `translateX(${
                            itemIndex % 2 === 0 ? -18 : 18
                          }px)`,
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {scene.type === 'change' && (
                  <div className="relative text-center">
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-yellow-100/15 bg-yellow-200/[0.035] shadow-[0_0_80px_rgba(224,180,85,0.12)]">
                      <span className="font-serif text-5xl text-yellow-100">
                        ♡
                      </span>
                    </div>

                    <p className="mt-7 text-[9px] uppercase tracking-[0.55em] text-white/30">
                      Bhai Se Muhabbat Tak
                    </p>
                  </div>
                )}

                {scene.type === 'counter' && (
                  <div className="relative text-center">
                    <p className="gold-text luxury-title text-[110px] leading-none sm:text-[150px]">
                      {dayCount}
                    </p>

                    <p className="mt-4 text-[9px] uppercase tracking-[0.7em] text-white/30">
                      Days
                    </p>
                  </div>
                )}
              </div>

              <div
                className={`
                  transition-all
                  duration-[1500ms]
                  ${reverse ? 'lg:order-1' : ''}
                  ${
                    active
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-14 opacity-20'
                  }
                `}
              >
                <p className="text-[8px] uppercase tracking-[0.65em] text-yellow-200/55">
                  {scene.chapter}
                </p>

                <p className="mt-4 font-serif text-base italic text-white/30">
                  {scene.date}
                </p>

                <h2 className="luxury-title mt-6 max-w-xl text-4xl leading-[1.02] text-white sm:text-5xl md:text-6xl">
                  {scene.title}
                </h2>

                <div className="mt-8 h-px w-28 bg-gradient-to-r from-yellow-200/70 to-transparent" />

                <div className="mt-8 space-y-3">
                  {scene.lines.map((line, lineIndex) => (
                    <p
                      key={line}
                      className="
                        font-serif
                        text-lg
                        font-light
                        leading-8
                        text-white/45
                        sm:text-xl
                      "
                      style={{
                        transitionDelay: `${lineIndex * 130}ms`,
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <p className="mt-8 font-serif text-2xl italic leading-9 text-yellow-100/90 sm:text-3xl">
                  {scene.accent}
                </p>

                {scene.quote && (
                  <blockquote className="relative mt-9 max-w-xl border-l border-yellow-200/25 py-2 pl-7 font-serif text-lg italic leading-8 text-white/48">
                    <span className="absolute -left-px top-0 h-12 w-px bg-yellow-100 shadow-[0_0_15px_rgba(255,220,130,0.5)]" />
                    “{scene.quote}”
                  </blockquote>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/[0.05] blur-[180px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-100/[0.07]" />

        <div className="relative mx-auto max-w-4xl">
          <p className="text-[9px] uppercase tracking-[0.7em] text-yellow-200/55">
            And That Was Only The Beginning
          </p>

          <h2 className="luxury-title mt-8 text-5xl leading-[0.95] text-white sm:text-6xl md:text-8xl">
            We Created Moments
            <br />
            <span className="gold-text italic">Worth Remembering</span>
          </h2>

          <div className="mx-auto mt-10 flex max-w-xs items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-2xl text-yellow-100">☾</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <p className="mx-auto mt-9 max-w-2xl font-serif text-lg font-light leading-9 text-white/45 sm:text-xl">
            Humne sirf baatein nahi ki.
            <br />
            Humne aisi memories banayi hain jo sari zindagi mere saath rahengi.
          </p>

          <p className="mx-auto mt-7 max-w-xl font-serif text-2xl italic leading-9 text-yellow-100/90">
            Guggoo was never just another person.
            <br />
            She was something else. Something different.
          </p>

          <div className="mt-14">
            <NavigationButton
              href="/memories"
              label="Open Our Memories"
              loadingLabel="Opening Our Memories..."
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
