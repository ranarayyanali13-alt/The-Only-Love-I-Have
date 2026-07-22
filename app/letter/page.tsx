'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import NavigationButton from '@/components/NavigationButton';

const letterParagraphs = [
  `Guggoo, kabhi kabhi main sochta hoon ke tumhein kaise bataun ke tum meri zindagi mein kitni important ho. Words kam par jate hain, aur jo dil mehsoos karta hai woh properly likha hi nahi jata.`,

  `Main pehle bhi logon se baat karta tha, lekin tum something else ho. Something different. Tumhari presence ne ordinary conversations ko memories mein aur meri daily life ko ek naye feeling mein badal diya.`,

  `Tumhara message aana, tumhara naraz hona, tumhara hansna, tumhari calls, tumhara video call par so jana — ye sab choti choti cheezen lag sakti hain, lekin mere liye inki bohat bari jagah hai.`,

  `Kabhi kuch kahi aur kuch ankahi baatein tumhein buri lag jati hongi. Ho sakta hai kabhi mere words sahi na hon, magar mera intention kabhi tumhein hurt karna nahi hota.`,

  `Main tumhein perfect keh kar fake baat nahi karunga. Hum dono perfect nahi hain. Hamari story bhi perfect nahi. Lekin jo hai, woh real hai. Aur mere liye real cheezen hi sab se zyada beautiful hoti hain.`,

  `Tum soch bhi nahi sakti ke tum mere liye kitna maayne rakhti ho. Tum sirf meri memories ka part nahi ho. Tum meri aadaton, meri fikr, meri khushi aur meri duaon ka part ban chuki ho.`,

  `Mujhe nahi pata life humein kahan le kar jayegi, lekin itna pata hai ke jo waqt tumhare saath guzra, usne mujhe change kiya hai. Aur woh change mere andar hamesha rahega.`,

  `I love you bohat sara, Guggoo. Shayad main har dafa sahi tarah keh nahi pata, lekin mera dil ye baat roz jaanta hai.`,
];

export default function LetterPage() {
  const [introFinished, setIntroFinished] = useState(false);
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [signatureVisible, setSignatureVisible] = useState(false);
  const [sealOpened, setSealOpened] = useState(false);

  const letterRef = useRef<HTMLElement | null>(null);

  const inkDots = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        left: `${(index * 29.7) % 100}%`,
        top: `${(index * 43.2) % 100}%`,
        size: 1 + (index % 3),
        delay: `${index * 0.24}s`,
      })),
    []
  );

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setIntroFinished(true);
    }, 1800);

    return () => {
      window.clearTimeout(introTimer);
    };
  }, []);

  useEffect(() => {
    if (!sealOpened) return;

    setVisibleParagraphs(0);
    setSignatureVisible(false);

    let current = 0;

    const paragraphTimer = window.setInterval(() => {
      current += 1;
      setVisibleParagraphs(current);

      if (current >= letterParagraphs.length) {
        window.clearInterval(paragraphTimer);

        window.setTimeout(() => {
          setSignatureVisible(true);
        }, 700);
      }
    }, 850);

    return () => {
      window.clearInterval(paragraphTimer);
    };
  }, [sealOpened]);

  const openLetter = () => {
    if (sealOpened) return;

    setSealOpened(true);

    window.setTimeout(() => {
      letterRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 900);
  };

  return (
    <PageLayout eyebrow="Chapter Four — A Letter For You">
      {/* Background */}

      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(226,190,104,0.08),transparent_36%)]" />

        <div className="absolute -left-64 top-[18%] h-[620px] w-[620px] rounded-full bg-amber-500/[0.04] blur-[190px]" />

        <div className="absolute -right-64 bottom-[8%] h-[620px] w-[620px] rounded-full bg-yellow-100/[0.035] blur-[190px]" />

        {inkDots.map((dot, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-yellow-100/25 blur-[0.5px]"
            style={{
              left: dot.left,
              top: dot.top,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              animation: `letterDust 8s linear infinite`,
              animationDelay: dot.delay,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.22)_58%,black_100%)]" />
      </div>

      {/* Intro */}

      <section className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div
          className={`
            mx-auto
            max-w-5xl
            transition-all
            duration-[1800ms]
            ${
              introFinished
                ? 'translate-y-0 opacity-100'
                : 'translate-y-14 opacity-0'
            }
          `}
        >
          <p className="text-[9px] uppercase tracking-[0.75em] text-yellow-200/60">
            Chapter IV
          </p>

          <h1 className="luxury-title mt-8 text-6xl leading-[0.9] text-white sm:text-7xl md:text-9xl">
            Words I Could
            <br />
            <span className="gold-text italic">Never Say Properly</span>
          </h1>

          <div className="mx-auto mt-10 flex max-w-sm items-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-2xl text-yellow-100">✦</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <p className="mx-auto mt-10 max-w-2xl font-serif text-lg font-light leading-9 text-white/45 sm:text-xl">
            Kuch feelings messages mein fit nahi hotin.
            <br />
            Kuch baatein sirf dil se likhi ja sakti hain.
          </p>

          <button
            type="button"
            onClick={openLetter}
            className="
              group
              relative
              mt-16
              inline-flex
              min-h-[60px]
              min-w-[220px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-yellow-200/25
              bg-white/[0.025]
              px-10
              py-4
              font-serif
              text-white
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-yellow-100/60
              active:scale-[0.97]
            "
          >
            <span className="absolute inset-0 -translate-x-[105%] bg-gradient-to-r from-[#fff1bd] via-[#d9b45d] to-[#9f6c28] transition-transform duration-500 group-hover:translate-x-0" />

            <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-black">
              Open My Letter
              <span>→</span>
            </span>
          </button>
        </div>
      </section>

      {/* Letter */}

      <section
        ref={letterRef}
        className="relative z-10 flex min-h-screen items-start justify-center px-4 py-24 sm:px-6"
      >
        <div
          className={`
            relative
            w-full
            max-w-4xl
            transition-all
            duration-[1600ms]
            ${
              sealOpened
                ? 'translate-y-0 rotate-0 opacity-100'
                : 'translate-y-24 rotate-1 opacity-0'
            }
          `}
        >
          {/* Paper shadow */}

          <div className="absolute inset-x-8 bottom-[-30px] top-12 -z-10 rounded-[40px] bg-black/70 blur-3xl" />

          {/* Paper */}

          <article
            className="
              relative
              overflow-hidden
              rounded-[34px]
              border
              border-[#e7d7b0]/20
              bg-[#e9dfc5]
              px-6
              py-14
              text-[#2b2117]
              shadow-[0_40px_120px_rgba(0,0,0,0.7)]
              sm:px-12
              md:px-16
              md:py-20
            "
          >
            {/* Paper texture */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.13]
                [background-image:radial-gradient(rgba(78,55,28,0.5)_0.55px,transparent_0.55px)]
                [background-size:5px_5px]
              "
            />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.45),transparent_35%,rgba(91,62,29,0.08))]" />

            {/* Fold lines */}

            <div className="pointer-events-none absolute inset-y-0 left-10 w-px bg-[#9d7b49]/10 sm:left-16" />

            <div className="pointer-events-none absolute inset-x-0 top-28 h-px bg-[#9d7b49]/10" />

            {/* Header */}

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.55em] text-[#7b5d35]/60">
                    A Private Letter
                  </p>

                  <p className="mt-4 font-serif text-sm italic text-[#5a4228]/60">
                    Written for one person only
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#8a6231]/20 bg-[#7b5224]/5 font-serif text-2xl text-[#6b471e]">
                  ☾
                </div>
              </div>

              <div className="mt-12">
                <p className="font-serif text-xl italic text-[#674821]/70">
                  My dearest,
                </p>

                <h2 className="mt-3 font-serif text-5xl leading-none text-[#2b2117] sm:text-6xl">
                  Guggoo
                </h2>

                <div className="mt-8 h-px w-28 bg-gradient-to-r from-[#76501f]/60 to-transparent" />
              </div>
            </div>

            {/* Paragraphs */}

            <div className="relative z-10 mt-12 space-y-8">
              {letterParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`
                    font-serif
                    text-lg
                    leading-9
                    text-[#3b2c1e]/85
                    transition-all
                    duration-1000
                    sm:text-xl
                    sm:leading-10
                    ${
                      visibleParagraphs > index
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-6 opacity-0'
                    }
                  `}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signature */}

            <div
              className={`
                relative
                z-10
                mt-16
                border-t
                border-[#7c5b31]/15
                pt-10
                transition-all
                duration-[1400ms]
                ${
                  signatureVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }
              `}
            >
              <p className="font-serif text-base italic text-[#6b4c27]/65">
                Forever written with love,
              </p>

              <p className="mt-4 font-serif text-4xl italic text-[#4c3218] sm:text-5xl">
                Rayyan
              </p>

              <div className="mt-4 h-px w-40 bg-gradient-to-r from-[#67451c]/60 to-transparent" />

              <p className="mt-5 text-[8px] uppercase tracking-[0.5em] text-[#6a4c2d]/45">
                For Guggoo — Always
              </p>
            </div>

            {/* Wax seal */}

            <div
              className={`
                absolute
                bottom-8
                right-8
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-[#5d271b]/25
                bg-[#7c2e22]
                font-serif
                text-3xl
                text-[#e6bd7b]
                shadow-[0_12px_30px_rgba(58,18,12,0.35)]
                transition-all
                delay-700
                duration-1000
                ${
                  signatureVisible
                    ? 'scale-100 rotate-[-8deg] opacity-100'
                    : 'scale-50 rotate-12 opacity-0'
                }
              `}
            >
              R
            </div>
          </article>
        </div>
      </section>

      {/* Ending */}

      <section className="relative z-10 flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/[0.05] blur-[180px]" />

        <div className="relative mx-auto max-w-4xl">
          <p className="text-[9px] uppercase tracking-[0.7em] text-yellow-200/55">
            Some Words Still Remain
          </p>

          <h2 className="luxury-title mt-8 text-5xl leading-[0.95] text-white sm:text-6xl md:text-8xl">
            Love Also Means
            <br />
            <span className="gold-text italic">Knowing When To Say Sorry</span>
          </h2>

          <div className="mx-auto mt-10 flex max-w-xs items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-200/40" />

            <span className="font-serif text-2xl text-yellow-100">♡</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-200/40" />
          </div>

          <p className="mx-auto mt-9 max-w-2xl font-serif text-lg font-light leading-9 text-white/45 sm:text-xl">
            Har muhabbat mein kuch baatein reh jati hain jo dil ko halka karne
            ke liye kehna zaroori hota hai.
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
