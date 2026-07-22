'use client';

import { useEffect, useMemo, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import NavigationButton from '@/components/NavigationButton';

type Memory = {
  id: number;
  src: string;
  date: string;
  title: string;
  caption: string;
  rotation: number;
};

const memoryDetails = [
  {
    date: '3 December',
    title: 'The First DM',
    caption:
      'A single message appeared, and an ordinary day suddenly became unforgettable.',
  },
  {
    date: 'Late Nights',
    title: 'Conversations Without End',
    caption:
      'We kept talking until sleep won, never knowing those nights would become memories.',
  },
  {
    date: 'Every Morning',
    title: 'Your Videos',
    caption:
      'Watching you became part of my morning before I even realised it had become a habit.',
  },
  {
    date: 'Video Calls',
    title: 'When You Fell Asleep',
    caption:
      'Even silence felt special when you were there on the other side of the screen.',
  },
  {
    date: '10 June',
    title: 'The Words I Waited For',
    caption:
      'After so much insisting, those three words finally filled the entire conversation.',
  },
  {
    date: 'One Promise',
    title: 'The Day You Stopped Me',
    caption:
      'You asked me not to hurt myself again, and from that day I kept my promise.',
  },
  {
    date: 'Small Moments',
    title: 'Things Only We Know',
    caption:
      'The jokes, arguments and tiny habits that would mean nothing to anyone else.',
  },
  {
    date: 'Still Counting',
    title: 'Days With Your Name',
    caption:
      'Every day carried something that quietly made you more important to me.',
  },
];

export default function MemoriesPage() {
  const [loaded, setLoaded] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const memories = useMemo<Memory[]>(() => {
    return Array.from({ length: 79 }, (_, index) => {
      const detail = memoryDetails[index % memoryDetails.length];

      return {
        id: index + 1,
        src: `/memories/${index + 1}.jpg`,
        date: detail.date,
        title: detail.title,
        caption: detail.caption,
        rotation: ((index * 7) % 9) - 4,
      };
    });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!selectedMemory) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedMemory(null);
      }
    };

    window.addEventListener('keydown', closeWithEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeWithEscape);
    };
  }, [selectedMemory]);

  const openPreviousMemory = () => {
    if (!selectedMemory) return;

    const previousId =
      selectedMemory.id === 1 ? memories.length : selectedMemory.id - 1;

    setSelectedMemory(memories[previousId - 1]);
  };

  const openNextMemory = () => {
    if (!selectedMemory) return;

    const nextId =
      selectedMemory.id === memories.length ? 1 : selectedMemory.id + 1;

    setSelectedMemory(memories[nextId - 1]);
  };

  return (
    <PageLayout eyebrow="Chapter Two — Our Memories">
      {/* Cinematic introduction */}

      <section
        className="
          relative
          flex
          min-h-screen
          min-h-[100svh]
          items-center
          justify-center
          overflow-hidden
          px-6
          py-24
          text-center
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[42%]
            h-[650px]
            w-[650px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-yellow-200/[0.055]
            blur-[180px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[42%]
            h-[440px]
            w-[440px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-yellow-100/[0.06]
          "
        />

        <div
          className={`
            relative
            mx-auto
            max-w-5xl
            transition-all
            duration-[1800ms]
            ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-14 opacity-0'}
          `}
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.75em]
              text-yellow-200/60
            "
          >
            Chapter II
          </p>

          <h1
            className="
              luxury-title
              mt-8
              text-6xl
              leading-[0.88]
              text-white
              sm:text-7xl
              md:text-9xl
            "
          >
            Moments That
            <br />
            <span className="gold-text italic">Became Memories</span>
          </h1>

          <div
            className="
              mx-auto
              mt-10
              flex
              max-w-sm
              items-center
              gap-5
            "
          >
            <span
              className="
                h-px
                flex-1
                bg-gradient-to-r
                from-transparent
                to-yellow-200/40
              "
            />

            <span
              className="
                font-serif
                text-2xl
                text-yellow-100
              "
            >
              ☾
            </span>

            <span
              className="
                h-px
                flex-1
                bg-gradient-to-l
                from-transparent
                to-yellow-200/40
              "
            />
          </div>

          <p
            className="
              mx-auto
              mt-10
              max-w-2xl
              font-serif
              text-lg
              font-light
              leading-9
              text-white/45
              sm:text-xl
            "
          >
            Some memories live inside pictures.
            <br />
            Some live inside conversations.
            <br />
            And some remain quietly inside the heart forever.
          </p>

          <button
            type="button"
            onClick={() => {
              document.getElementById('memory-gallery')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
            className="
              group
              mt-16
              inline-flex
              flex-col
              items-center
              gap-4
              text-white/25
              transition-colors
              duration-500
              hover:text-yellow-100
            "
          >
            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.55em]
              "
            >
              Enter Our Gallery
            </span>

            <span
              className="
                flex
                h-12
                w-7
                justify-center
                rounded-full
                border
                border-white/15
                pt-2
              "
            >
              <span
                className="
                  h-2
                  w-px
                  animate-bounce
                  bg-yellow-200/65
                "
              />
            </span>
          </button>
        </div>
      </section>

      {/* Featured memory cards */}

      <section
        id="memory-gallery"
        className="
          relative
          overflow-hidden
          px-5
          py-24
          sm:px-8
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-[-240px]
            top-[15%]
            h-[520px]
            w-[520px]
            rounded-full
            bg-amber-500/[0.045]
            blur-[170px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-240px]
            bottom-[5%]
            h-[540px]
            w-[540px]
            rounded-full
            bg-yellow-100/[0.04]
            blur-[180px]
          "
        />

        <div className="relative mx-auto max-w-7xl">
          <div
            className="
              mb-16
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.65em]
                  text-yellow-200/55
                "
              >
                Our Private Archive
              </p>

              <h2
                className="
                  luxury-title
                  mt-5
                  text-4xl
                  leading-tight
                  text-white
                  sm:text-5xl
                  md:text-6xl
                "
              >
                Seventy Nine Pieces
                <br />
                <span className="gold-text italic">Of Our Story</span>
              </h2>
            </div>

            <p
              className="
                max-w-md
                font-serif
                text-base
                leading-8
                text-white/35
                sm:text-lg
              "
            >
              Every picture holds only one frame. The real memory lives in
              everything that happened before and after it.
            </p>
          </div>

          <div
            className="
              columns-1
              gap-5
              sm:columns-2
              lg:columns-3
              xl:columns-4
            "
          >
            {memories.slice(0, visibleCount).map((memory, index) => (
              <button
                key={memory.id}
                type="button"
                onClick={() => {
                  setSelectedMemory(memory);
                }}
                className="
                    group
                    relative
                    mb-5
                    block
                    w-full
                    break-inside-avoid
                    overflow-hidden
                    rounded-[30px]
                    border
                    border-white/[0.09]
                    bg-white/[0.025]
                    p-3
                    text-left
                    shadow-[0_24px_70px_rgba(0,0,0,0.35)]
                    backdrop-blur-xl
                    transition-all
                    duration-700
                    hover:-translate-y-2
                    hover:border-yellow-200/30
                    hover:shadow-[0_32px_90px_rgba(205,162,73,0.11)]
                    active:scale-[0.98]
                  "
                style={{
                  transform:
                    index % 5 === 0
                      ? `rotate(${memory.rotation * 0.25}deg)`
                      : undefined,
                }}
              >
                <div
                  className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-yellow-100/[0.06]
                      via-transparent
                      to-transparent
                      opacity-0
                      transition-opacity
                      duration-700
                      group-hover:opacity-100
                    "
                />

                <div
                  className={`
                      relative
                      overflow-hidden
                      rounded-[22px]
                      bg-[#090909]
                      ${
                        index % 7 === 0
                          ? 'aspect-[4/5]'
                          : index % 4 === 0
                          ? 'aspect-square'
                          : 'aspect-[3/4]'
                      }
                    `}
                >
                  <img
                    src={memory.src}
                    alt={memory.title}
                    loading="lazy"
                    className="
                        h-full
                        w-full
                        object-cover
                        opacity-90
                        transition-all
                        duration-1000
                        group-hover:scale-105
                        group-hover:opacity-100
                      "
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />

                  <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black
                        via-black/5
                        to-transparent
                      "
                  />

                  <span
                    className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/15
                        bg-black/35
                        font-serif
                        text-sm
                        text-yellow-100
                        opacity-0
                        backdrop-blur-lg
                        transition-all
                        duration-500
                        group-hover:opacity-100
                      "
                  >
                    ↗
                  </span>

                  <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        p-5
                      "
                  >
                    <p
                      className="
                          text-[7px]
                          uppercase
                          tracking-[0.45em]
                          text-yellow-200/60
                        "
                    >
                      {memory.date}
                    </p>

                    <h3
                      className="
                          mt-3
                          font-serif
                          text-xl
                          text-white
                        "
                    >
                      {memory.title}
                    </h3>
                  </div>
                </div>

                <div className="relative px-3 pb-3 pt-5">
                  <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                  >
                    <p
                      className="
                          text-[7px]
                          uppercase
                          tracking-[0.4em]
                          text-white/22
                        "
                    >
                      Memory {String(memory.id).padStart(2, '0')}
                    </p>

                    <span
                      className="
                          font-serif
                          text-lg
                          text-yellow-100/70
                        "
                    >
                      ♡
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {visibleCount < memories.length && (
            <div className="mt-16 text-center">
              <button
                type="button"
                onClick={() => {
                  setVisibleCount((previous) =>
                    Math.min(previous + 12, memories.length)
                  );
                }}
                className="luxury-button"
              >
                <span>Reveal More Memories</span>
                <span>＋</span>
              </button>

              <p
                className="
                  mt-5
                  text-[8px]
                  uppercase
                  tracking-[0.45em]
                  text-white/20
                "
              >
                {visibleCount} of {memories.length}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Memory statement */}

      <section
        className="
          relative
          flex
          min-h-screen
          min-h-[100svh]
          items-center
          justify-center
          overflow-hidden
          px-6
          py-24
          text-center
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[620px]
            w-[620px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-yellow-200/[0.05]
            blur-[180px]
          "
        />

        <div className="relative mx-auto max-w-4xl">
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.7em]
              text-yellow-200/55
            "
          >
            More Than Photographs
          </p>

          <h2
            className="
              luxury-title
              mt-8
              text-5xl
              leading-[0.95]
              text-white
              sm:text-6xl
              md:text-8xl
            "
          >
            The Camera Saved
            <br />
            <span className="gold-text italic">Only Half The Story</span>
          </h2>

          <div
            className="
              mx-auto
              mt-10
              flex
              max-w-xs
              items-center
              gap-4
            "
          >
            <span
              className="
                h-px
                flex-1
                bg-gradient-to-r
                from-transparent
                to-yellow-200/40
              "
            />

            <span
              className="
                font-serif
                text-2xl
                text-yellow-100
              "
            >
              ♡
            </span>

            <span
              className="
                h-px
                flex-1
                bg-gradient-to-l
                from-transparent
                to-yellow-200/40
              "
            />
          </div>

          <p
            className="
              mx-auto
              mt-9
              max-w-2xl
              font-serif
              text-lg
              font-light
              leading-9
              text-white/45
              sm:text-xl
            "
          >
            The real memories were in the laughs, the waiting, the calls, the
            arguments and the silence that only we understood.
          </p>

          <p
            className="
              mx-auto
              mt-7
              max-w-xl
              font-serif
              text-2xl
              italic
              leading-9
              text-yellow-100/90
            "
          >
            Some details never needed a photograph because my heart remembered
            them.
          </p>

          <div className="mt-14">
            <NavigationButton
              href="/remember"
              label="Things I Still Remember"
              loadingLabel="Opening The Memories..."
            />
          </div>
        </div>
      </section>

      {/* Full-screen lightbox */}

      {selectedMemory && (
        <div
          className="
            fixed
            inset-0
            z-[500]
            flex
            items-center
            justify-center
            bg-black/95
            px-4
            py-6
            backdrop-blur-2xl
          "
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => {
              setSelectedMemory(null);
            }}
            className="
              absolute
              right-5
              top-5
              z-20
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-black/45
              text-xl
              text-white/70
              backdrop-blur-xl
              transition-all
              hover:border-yellow-200/40
              hover:text-yellow-100
              active:scale-90
            "
            aria-label="Close memory"
          >
            ×
          </button>

          <button
            type="button"
            onClick={openPreviousMemory}
            className="
              absolute
              left-3
              top-1/2
              z-20
              flex
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-black/45
              text-xl
              text-white/70
              backdrop-blur-xl
              transition-all
              hover:border-yellow-200/40
              hover:text-yellow-100
              active:scale-90
              sm:left-7
            "
            aria-label="Previous memory"
          >
            ←
          </button>

          <button
            type="button"
            onClick={openNextMemory}
            className="
              absolute
              right-3
              top-1/2
              z-20
              flex
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-black/45
              text-xl
              text-white/70
              backdrop-blur-xl
              transition-all
              hover:border-yellow-200/40
              hover:text-yellow-100
              active:scale-90
              sm:right-7
            "
            aria-label="Next memory"
          >
            →
          </button>

          <div
            className="
              relative
              grid
              max-h-[92vh]
              w-full
              max-w-6xl
              overflow-hidden
              rounded-[34px]
              border
              border-white/10
              bg-white/[0.035]
              shadow-[0_40px_140px_rgba(0,0,0,0.8)]
              backdrop-blur-2xl
              lg:grid-cols-[1.45fr_0.8fr]
            "
          >
            <div
              className="
                relative
                min-h-[55vh]
                overflow-hidden
                bg-[#050505]
                lg:min-h-[82vh]
              "
            >
              <img
                key={selectedMemory.src}
                src={selectedMemory.src}
                alt={selectedMemory.title}
                className="
                  h-full
                  w-full
                  animate-[memoryImageReveal_0.8s_ease_both]
                  object-contain
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-transparent
                  to-black/20
                "
              />
            </div>

            <div
              className="
                relative
                flex
                flex-col
                justify-center
                p-8
                sm:p-10
                lg:p-12
              "
            >
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.55em]
                  text-yellow-200/60
                "
              >
                {selectedMemory.date}
              </p>

              <h3
                className="
                  luxury-title
                  mt-6
                  text-4xl
                  leading-tight
                  text-white
                  sm:text-5xl
                "
              >
                {selectedMemory.title}
              </h3>

              <div
                className="
                  mt-8
                  h-px
                  w-24
                  bg-gradient-to-r
                  from-yellow-200/65
                  to-transparent
                "
              />

              <p
                className="
                  mt-8
                  font-serif
                  text-lg
                  leading-9
                  text-white/45
                "
              >
                {selectedMemory.caption}
              </p>

              <blockquote
                className="
                  mt-9
                  border-l
                  border-yellow-200/25
                  pl-6
                  font-serif
                  text-xl
                  italic
                  leading-8
                  text-yellow-100/80
                "
              >
                “A moment may pass, but the feeling it created can stay
                forever.”
              </blockquote>

              <div
                className="
                  mt-10
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/[0.07]
                  pt-6
                "
              >
                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.45em]
                    text-white/25
                  "
                >
                  Memory
                </span>

                <span
                  className="
                    font-serif
                    text-lg
                    text-yellow-100
                  "
                >
                  {String(selectedMemory.id).padStart(2, '0')}
                  {' / '}
                  {memories.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
