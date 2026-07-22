'use client';

import { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import NavigationButton from '@/components/NavigationButton';

export default function SorryPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);

    return () => clearTimeout(t);
  }, []);

  return (
    <PageLayout eyebrow="Chapter Five — I'm Sorry">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-[15%] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-yellow-200/5 blur-[180px]" />

          <div className="absolute -left-60 bottom-0 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[170px]" />

          <div className="absolute -right-60 top-20 h-[500px] w-[500px] rounded-full bg-yellow-100/5 blur-[170px]" />
        </div>

        <div
          className={`
relative
z-20
mx-auto
max-w-5xl
text-center
transition-all
duration-[1800ms]
${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
`}
        >
          <p className="uppercase tracking-[0.8em] text-[10px] text-yellow-200/60">
            Chapter V
          </p>

          <h1 className="luxury-title mt-8 text-6xl leading-[0.88] text-white md:text-8xl">
            Some Things
            <br />
            <span className="gold-text italic">I Need To Say</span>
          </h1>

          <div className="mx-auto mt-10 h-px w-56 bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent" />

          <p className="mx-auto mt-10 max-w-3xl font-serif text-xl leading-10 text-white/45">
            Sometimes love is not only saying "I Love You."
            <br />
            <br />
            Sometimes... love is having the courage to say
            <span className="text-yellow-100">"I'm Sorry."</span>
          </p>
        </div>
      </section>

      {/* SECTION */}

      <section className="relative mx-auto max-w-5xl px-6 py-32">
        <div className="rounded-[40px] border border-white/10 bg-white/[0.03] p-12 backdrop-blur-2xl">
          <p className="uppercase tracking-[0.5em] text-[10px] text-yellow-200/60">
            01
          </p>

          <h2 className="luxury-title mt-6 text-5xl text-white">Time...</h2>

          <div className="mt-8 h-px w-24 bg-gradient-to-r from-yellow-200/60 to-transparent" />

          <p className="mt-10 font-serif text-xl leading-10 text-white/45">
            I'm sorry... sometimes I couldn't give you enough time. Sometimes I
            disappeared early at night. Not because I wanted to... but because
            home responsibilities pulled me away.
          </p>

          <blockquote className="mt-12 border-l border-yellow-200/20 pl-6 font-serif text-2xl italic text-yellow-100">
            Believe me... if it were only my decision, I would have stayed with
            you a little longer every night.
          </blockquote>
        </div>
      </section>

      {/* SECTION */}

      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[40px] border border-white/10 bg-white/[0.03] p-12 backdrop-blur-2xl">
          <p className="uppercase tracking-[0.5em] text-[10px] text-yellow-200/60">
            02
          </p>

          <h2 className="luxury-title mt-6 text-5xl text-white">
            Your Silence
          </h2>

          <div className="mt-8 h-px w-24 bg-gradient-to-r from-yellow-200/60 to-transparent" />

          <p className="mt-10 font-serif text-xl leading-10 text-white/45">
            The hardest thing for me was never an argument. It was seeing you
            quiet. Seeing you upset. Seeing you reply differently. Because every
            time that happened... I felt like I had failed somewhere.
          </p>

          <blockquote className="mt-12 border-l border-yellow-200/20 pl-6 font-serif text-2xl italic text-yellow-100">
            I never liked seeing you angry with me. Not even for a minute.
          </blockquote>
        </div>
      </section>
      {/* SECTION */}

      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[40px] border border-white/10 bg-white/[0.03] p-12 backdrop-blur-2xl">
          <p className="uppercase tracking-[0.5em] text-[10px] text-yellow-200/60">
            03
          </p>

          <h2 className="luxury-title mt-6 text-5xl text-white">
            The Biggest Truth
          </h2>

          <div className="mt-8 h-px w-24 bg-gradient-to-r from-yellow-200/60 to-transparent" />

          <p className="mt-10 font-serif text-xl leading-10 text-white/45">
            There is one truth... that hurts me every single day.
            <br />
            <br />
            Maybe... I won't be able to have you beside me forever.
            <br />
            <br />
            And accepting that... has never been easy.
          </p>

          <blockquote className="mt-12 border-l border-yellow-200/20 pl-6 font-serif text-2xl italic text-yellow-100">
            If love alone was enough... I would've never let you go.
          </blockquote>
        </div>
      </section>

      {/* SECTION */}

      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[40px] border border-white/10 bg-white/[0.03] p-12 backdrop-blur-2xl">
          <p className="uppercase tracking-[0.5em] text-[10px] text-yellow-200/60">
            04
          </p>

          <h2 className="luxury-title mt-6 text-5xl text-white">
            Until That Day
          </h2>

          <div className="mt-8 h-px w-24 bg-gradient-to-r from-yellow-200/60 to-transparent" />

          <p className="mt-10 font-serif text-xl leading-10 text-white/45">
            But then... I realised something.
            <br />
            <br />
            Crying over tomorrow only steals today.
            <br />
            <br />
            So instead... I want to live every moment that I still have with
            you.
          </p>

          <blockquote className="mt-12 border-l border-yellow-200/20 pl-6 font-serif text-2xl italic text-yellow-100">
            Every minute with you is already a beautiful memory.
          </blockquote>
        </div>
      </section>

      {/* FINALE */}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/5 blur-[180px]" />

        <div className="relative z-20 mx-auto max-w-4xl">
          <p className="uppercase tracking-[0.7em] text-[10px] text-yellow-200/60">
            Thank You...
          </p>

          <h2 className="luxury-title mt-8 text-6xl leading-[0.9] text-white md:text-8xl">
            For Loving Me
          </h2>

          <div className="mx-auto mt-10 h-px w-56 bg-gradient-to-r from-transparent via-yellow-200/60 to-transparent" />

          <p className="mx-auto mt-10 max-w-3xl font-serif text-xl leading-10 text-white/45">
            Maybe I wasn't perfect.
            <br />
            <br />
            Maybe I made mistakes.
            <br />
            <br />
            Maybe I couldn't become everything you deserved.
            <br />
            <br />
            But... every feeling I ever had for you was real.
          </p>

          <blockquote className="mx-auto mt-14 max-w-2xl font-serif text-3xl italic text-yellow-100">
            I love you... yesterday, today, and in every memory that will remain
            tomorrow.
          </blockquote>

          <div className="mt-20">
            <NavigationButton
              href="/promises"
              label="The Promises I Made"
              loadingLabel="Opening Promises..."
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
