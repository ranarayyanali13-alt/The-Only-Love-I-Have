
'use client';

import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import NavigationButton from '@/components/NavigationButton';

const memories = [
  {
    number: '01',
    date: '3 December',
    title: 'The First Message',
    text:
      'Tumhara pehla DM mere liye sirf ek message nahi tha. Us notification ne ek normal din ko meri zindagi ki sabse special beginning bana diya.',
  },
  {
    number: '02',
    date: 'Late Nights',
    title: 'Conversations Without End',
    text:
      'Hum baat karte karte waqt bhool jate thay. Kabhi hasi, kabhi narazgi aur kabhi sirf ek dusre ki presence hi kaafi hoti thi.',
  },
  {
    number: '03',
    date: 'Every Morning',
    title: 'A Habit With Your Name',
    text:
      'Subah tumhein dekhna meri routine ka hissa ban gaya tha. Kuch aadatein choti hoti hain, lekin unki kami bohat gehri mehsoos hoti hai.',
  },
  {
    number: '04',
    date: 'Video Calls',
    title: 'When Silence Felt Beautiful',
    text:
      'Kabhi tum call par so jati thi aur main bas tumhari presence mehsoos karta rehta tha. Har khoobsurat moment ko words ki zarurat nahi hoti.',
  },
  {
    number: '05',
    date: '10 June',
    title: 'The Words I Waited For',
    text:
      'Jin alfaaz ko sunne ke liye mujhe itna insist karna parta tha, us din tumne unhein itni baar kaha ke woh date hamesha ke liye yaadgar ban gayi.',
  },
  {
    number: '06',
    date: 'One Promise',
    title: 'Because You Cared',
    text:
      'Tumne mujhe khud par zulm karne se roka aur maine tumse promise kiya. Us din se aaj tak woh promise maine nahi toda.',
  },
  {
    number: '07',
    date: 'Small Things',
    title: 'Things Only We Understand',
    text:
      'Hamare jokes, arguments, calls aur choti choti baatein kisi aur ke liye normal hongi, magar mere liye woh poori duniya jaisi hain.',
  },
  {
    number: '08',
    date: 'Always',
    title: 'Memories Without Pictures',
    text:
      'Har memory ko picture ki zarurat nahi hoti. Kuch moments camera mein nahi, seedha dil mein save ho jate hain.',
  },
];

export default function MemoriesPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.remove('page-is-leaving');

    const timer = window.setTimeout(() => {
      setLoaded(true);
    }, 200);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <PageLayout eyebrow="Chapter Two — Our Memories">
      <section className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/[0.055] blur-[180px]" />

        <div
          className={`
            relative
            mx-auto
            max-w-5xl
            transition-all
            duration-[1600ms]
            ${
              loaded
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            }
          `}
        >
          <p className="text-[9px] uppercase tracking-[0.75em] text-yellow-200/60">
            Chapter II
          </p>

          <h1 className="luxury-title mt-8 text-6xl leading-[0.88] text-white sm:text-7xl md:text-9xl">
            Memories Need
            <br />

            <span className="gold-text italic">
              No Photographs
            </span>
          </h1>

          <div className="mx-auto mt-10 flex max-w-sm items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-2xl text-yellow-100">
              ☾
            </span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <p className="mx-auto mt-10 max-w-2xl font-serif text-lg leading-9 text-white/45 sm:text-xl">
            Humne jo moments saath guzare,
            unhein yaad rakhne ke liye kisi gallery ki zarurat nahi.
            Kuch cheezen seedha dil mein save ho jati hain.
          </p>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById('memory-cards')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="mt-14 text-[9px] uppercase tracking-[0.55em] text-yellow-100/60"
          >
            Read Our Memories ↓
          </button>
        </div>
      </section>

      <section
        id="memory-cards"
        className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8"
      >
        <div className="grid gap-8 md:grid-cols-2">
          {memories.map(memory => (
            <article
              key={memory.number}
              className="
                group
                relative
                overflow-hidden
                rounded-[36px]
                border
                border-white/[0.09]
                bg-white/[0.028]
                p-8
                shadow-[0_28px_80px_rgba(0,0,0,0.4)]
                backdrop-blur-2xl
                transition-all
                duration-700
                hover:-translate-y-2
                hover:border-yellow-200/30
                sm:p-10
              "
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-100/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.55em] text-yellow-200/55">
                      Memory {memory.number}
                    </p>

                    <p className="mt-3 font-serif text-base italic text-white/30">
                      {memory.date}
                    </p>
                  </div>

                  <span className="font-serif text-3xl text-yellow-100/70">
                    ♡
                  </span>
                </div>

                <h2 className="luxury-title mt-7 text-3xl leading-tight text-white sm:text-4xl">
                  {memory.title}
                </h2>

                <div className="mt-7 h-px w-24 bg-gradient-to-r from-yellow-200/65 to-transparent" />

                <p className="mt-7 font-serif text-lg leading-9 text-white/48">
                  {memory.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-[9px] uppercase tracking-[0.7em] text-yellow-200/55">
            My Heart Kept Everything
          </p>

          <h2 className="luxury-title mt-8 text-5xl leading-[0.95] text-white sm:text-6xl md:text-8xl">
            Some Moments
            <br />

            <span className="gold-text italic">
              Never Need Proof
            </span>
          </h2>

          <p className="mx-auto mt-10 max-w-2xl font-serif text-xl leading-9 text-white/45">
            Pictures na bhi hon,
            phir bhi har feeling aur har moment mere andar safe hai.
          </p>

          <div className="mt-14">
            <NavigationButton
              href="/remember"
              label="Things I Still Remember"
              loadingLabel="Opening..."
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}