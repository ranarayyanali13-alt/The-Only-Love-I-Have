'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import NavigationButton from '@/components/NavigationButton';

type MemoryDetail = {
  number: string;
  date: string;
  label: string;
  title: string;
  text: string;
  accent: string;
  symbol: string;
};

const details: MemoryDetail[] = [
  {
    number: '01',
    date: '10 June',
    label: 'The Words I Waited For',
    title: 'Unlimited I Love You',
    text: 'Shayad tum bhool gayi ho, lekin mujhe “I love you” sunne ke liye kitna insist karna parta tha. Phir 10 June ko unlimited chat mein tumne woh words itni baar kahe ke woh din mere liye hamesha special ban gaya.',
    accent: 'Some words arrive late, but once they do, they stay forever.',
    symbol: '∞',
  },
  {
    number: '02',
    date: 'Every Morning',
    label: 'A Habit With Your Name',
    title: 'Your Videos',
    text: 'Main tumhari videos roz subah apni gallery mein dekha karta tha. Shayad tumhare liye woh choti si baat thi, lekin mere liye meri subah ka ek hissa thi.',
    accent: 'You became part of my mornings without even trying.',
    symbol: '☀',
  },
  {
    number: '03',
    date: 'After They Were Gone',
    label: 'Something I Still Miss',
    title: 'The Empty Gallery',
    text: 'Jab tumne videos delete ki, chahe mazak mein ya kisi aur wajah se, meri roz subah tumhein dekhne wali aadat thori si mujhse cheen gayi.',
    accent: 'Some empty spaces are created by things that once felt ordinary.',
    symbol: '◌',
  },
  {
    number: '04',
    date: 'Video Calls',
    label: 'Quiet Moments',
    title: 'When You Fell Asleep',
    text: 'Tumhari video calls aa jati hain, kabhi kabhi tum so bhi jati ho. Main bas tumhein dekhta rehta hoon. Calls apni jagah bohat special hain, lekin saved videos ki apni alag jagah thi.',
    accent: 'Even your silence felt like company.',
    symbol: '☾',
  },
  {
    number: '05',
    date: 'One Promise',
    label: 'Because You Cared',
    title: 'The Chilli Promise',
    text: 'Tumne mujhe mirchain khane se mana kiya tha aur kaha tha ke khud par dobara zulm nahi karunga. Maine us din promise kiya tha, aur us din se aaj tak woh promise nahi toda.',
    accent:
      'Some promises are kept because the person asking matters more than the habit.',
    symbol: '✦',
  },
  {
    number: '06',
    date: 'More Than You Know',
    label: 'Your Importance',
    title: 'You Matter This Much',
    text: 'Mere liye tum bohat maayne rakhti ho. Shayad tum kabhi poori tarah soch bhi nahi sakti ke kitna zyada.',
    accent: 'You were never a small part of my life.',
    symbol: '♡',
  },
  {
    number: '07',
    date: 'The Difficult Day',
    label: 'What Hurt Me',
    title: 'I Only Wanted You Safe',
    text: 'Jis din narazgi mein tumne apne haath ko hurt kiya, mujhe bohat bura laga. Main ghusse mein isliye tha kyun ke tumhein takleef mein dekh kar main khud ko bohat helpless mehsoos kar raha tha.',
    accent: 'My anger was fear wearing a different face.',
    symbol: '—',
  },
  {
    number: '08',
    date: 'Always',
    label: 'My Intention',
    title: 'I Never Wanted To Hurt You',
    text: 'Kabhi kuch kahi ya ankahi baatein tumhein buri lag jati hongi, lekin mera intention kabhi tumhein hurt karna nahi hota. Main ghussa bhi bohat kam karta hoon, because I love you.',
    accent:
      'My words may fail sometimes, but my intention has always been love.',
    symbol: '∞',
  },
];

export default function RememberPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [typedLine, setTypedLine] = useState('');

  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        left: `${(index * 23.7) % 100}%`,
        top: `${(index * 39.5) % 100}%`,
        delay: `${(index % 14) * 0.4}s`,
        duration: `${7 + (index % 5)}s`,
        size: 1 + (index % 2),
      })),
    []
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoaded(true);
    }, 250);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.getAttribute('data-detail'));

          setActiveIndex(index);
        });
      },
      {
        threshold: 0.58,
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const line = details[activeIndex]?.accent ?? '';

    let currentIndex = 0;
    setTypedLine('');

    const typingTimer = window.setInterval(() => {
      currentIndex += 1;
      setTypedLine(line.slice(0, currentIndex));

      if (currentIndex >= line.length) {
        window.clearInterval(typingTimer);
      }
    }, 28);

    return () => {
      window.clearInterval(typingTimer);
    };
  }, [activeIndex]);

  const scrollToFirst = () => {
    sectionRefs.current[0]?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <PageLayout eyebrow="Chapter Three — Things I Remember">
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(219,181,91,0.09),transparent_38%)]" />

        <div className="absolute -left-64 top-[25%] h-[620px] w-[620px] rounded-full bg-amber-500/[0.04] blur-[185px]" />

        <div className="absolute -right-64 bottom-[8%] h-[620px] w-[620px] rounded-full bg-yellow-100/[0.035] blur-[185px]" />

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

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.26)_56%,black_100%)]" />
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
            Chapter III
          </p>

          <h1 className="luxury-title mt-8 text-6xl leading-[0.88] text-white sm:text-7xl md:text-9xl">
            Things My Heart
            <br />
            <span className="gold-text italic">Still Remembers</span>
          </h1>

          <div className="mx-auto mt-10 flex max-w-sm items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-2xl text-yellow-100">♡</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <p className="mx-auto mt-10 max-w-2xl font-serif text-lg font-light leading-9 text-white/45 sm:text-xl">
            Love was not only inside the big moments.
            <br />
            It lived inside habits, promises and tiny details that only we
            understood.
          </p>

          <button
            type="button"
            onClick={scrollToFirst}
            className="group mt-16 inline-flex flex-col items-center gap-4 text-white/25 transition-colors duration-500 hover:text-yellow-100"
          >
            <span className="text-[8px] uppercase tracking-[0.55em]">
              Remember With Me
            </span>

            <span className="flex h-12 w-7 justify-center rounded-full border border-white/15 pt-2">
              <span className="h-2 w-px animate-bounce bg-yellow-200/65" />
            </span>
          </button>
        </div>
      </section>

      {details.map((detail, index) => {
        const active = activeIndex === index;
        const reverse = index % 2 !== 0;

        return (
          <section
            key={detail.number}
            ref={(element) => {
              sectionRefs.current[index] = element;
            }}
            data-detail={index}
            className="relative z-10 flex min-h-screen min-h-[100svh] items-center overflow-hidden px-6 py-24"
          >
            <div
              className={`
                pointer-events-none
                absolute
                top-1/2
                h-[520px]
                w-[520px]
                -translate-y-1/2
                rounded-full
                bg-yellow-200/[0.045]
                blur-[160px]
                transition-all
                duration-[1800ms]
                ${reverse ? '-right-64' : '-left-64'}
                ${active ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
              `}
            />

            <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-28">
              <div
                className={`
                  relative
                  flex
                  min-h-[380px]
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
                <div className="absolute h-[320px] w-[320px] rounded-full border border-yellow-100/[0.08] bg-yellow-100/[0.015] shadow-[0_0_130px_rgba(220,180,90,0.07)] sm:h-[360px] sm:w-[360px]" />

                <div className="absolute h-[235px] w-[235px] rounded-full border border-white/[0.04] sm:h-[270px] sm:w-[270px]" />

                <div className="relative text-center">
                  <p className="font-serif text-[110px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(238,205,128,0.22)] sm:text-[145px]">
                    {detail.symbol}
                  </p>

                  <p className="mt-5 text-[8px] uppercase tracking-[0.55em] text-yellow-200/50">
                    Memory {detail.number}
                  </p>

                  <p className="mt-3 font-serif text-lg italic text-white/40">
                    {detail.date}
                  </p>
                </div>
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
                  {detail.label}
                </p>

                <h2 className="luxury-title mt-6 max-w-xl text-4xl leading-[1.02] text-white sm:text-5xl md:text-6xl">
                  {detail.title}
                </h2>

                <div className="mt-8 h-px w-28 bg-gradient-to-r from-yellow-200/70 to-transparent" />

                <p className="mt-8 max-w-xl font-serif text-lg font-light leading-9 text-white/48 sm:text-xl">
                  {detail.text}
                </p>

                <blockquote className="relative mt-10 min-h-[88px] max-w-xl border-l border-yellow-200/25 py-2 pl-7 font-serif text-xl italic leading-8 text-yellow-100/85">
                  <span className="absolute -left-px top-0 h-12 w-px bg-yellow-100 shadow-[0_0_15px_rgba(255,220,130,0.5)]" />

                  {active ? typedLine : detail.accent}

                  {active && typedLine.length < detail.accent.length && (
                    <span className="ml-1 inline-block h-5 w-px animate-pulse bg-yellow-100" />
                  )}
                </blockquote>
              </div>
            </div>
          </section>
        );
      })}

      <section className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/[0.05] blur-[180px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-100/[0.07]" />

        <div className="relative mx-auto max-w-4xl">
          <p className="text-[9px] uppercase tracking-[0.7em] text-yellow-200/55">
            Everything I Never Want To Forget
          </p>

          <h2 className="luxury-title mt-8 text-5xl leading-[0.95] text-white sm:text-6xl md:text-8xl">
            You Became Part
            <br />
            <span className="gold-text italic">Of My Everyday Life</span>
          </h2>

          <div className="mx-auto mt-10 flex max-w-xs items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-2xl text-yellow-100">☾</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <p className="mx-auto mt-9 max-w-2xl font-serif text-lg font-light leading-9 text-white/45 sm:text-xl">
            Tumhari videos, calls, words aur care ne mujhe badla. Tumhari
            importance sirf memories mein nahi, meri aadaton mein bhi hai.
          </p>

          <p className="mx-auto mt-7 max-w-xl font-serif text-2xl italic leading-9 text-yellow-100/90">
            There are still so many things I need to tell you.
          </p>

          <div className="mt-14">
            <NavigationButton
              href="/letter"
              label="Read My Letter"
              loadingLabel="Opening My Heart..."
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
