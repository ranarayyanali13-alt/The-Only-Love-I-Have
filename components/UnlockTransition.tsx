'use client';

type UnlockTransitionProps = {
  active: boolean;
};

export default function UnlockTransition({ active }: UnlockTransitionProps) {
  return (
    <div
      className={`
        pointer-events-none
        fixed
        inset-0
        z-[999]
        overflow-hidden
        transition-[visibility]
        duration-300
        ${active ? 'visible' : 'invisible'}
      `}
      aria-hidden="true"
    >
      <div
        className={`
          absolute
          inset-0
          bg-black
          transition-opacity
          duration-700
          ${active ? 'opacity-100' : 'opacity-0'}
        `}
      />

      <div
        className={`
          absolute
          left-1/2
          top-1/2
          h-[230px]
          w-[230px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-yellow-100/20
          blur-[90px]
          transition-all
          duration-[1400ms]
          ${active ? 'scale-[2.8] opacity-100' : 'scale-50 opacity-0'}
        `}
      />

      <div
        className={`
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          transition-all
          duration-[1300ms]
          ${active ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
        `}
      >
        <svg
          width="190"
          height="190"
          viewBox="0 0 220 220"
          className="
            drop-shadow-[0_0_45px_rgba(255,229,160,0.45)]
          "
        >
          <defs>
            <radialGradient id="unlockMoonGradient" cx="30%" cy="25%">
              <stop offset="0%" stopColor="#fffdf4" />

              <stop offset="45%" stopColor="#f1dca6" />

              <stop offset="100%" stopColor="#b47c2f" />
            </radialGradient>
          </defs>

          <circle cx="110" cy="110" r="70" fill="url(#unlockMoonGradient)" />

          <circle cx="139" cy="91" r="63" fill="#000000" />
        </svg>
      </div>

      {Array.from({ length: 24 }).map((_, index) => {
        const angle = (index / 24) * Math.PI * 2;
        const distance = 120 + (index % 4) * 24;

        return (
          <span
            key={index}
            className={`
              absolute
              left-1/2
              top-1/2
              h-1
              w-1
              rounded-full
              bg-yellow-100
              shadow-[0_0_14px_rgba(255,230,170,0.9)]
              transition-all
              duration-[1500ms]
              ease-out
              ${active ? 'opacity-0' : 'opacity-0'}
            `}
            style={{
              transform: active
                ? `translate(
                    calc(-50% + ${Math.cos(angle) * distance}px),
                    calc(-50% + ${Math.sin(angle) * distance}px)
                  ) scale(0.2)`
                : 'translate(-50%, -50%) scale(1)',
              opacity: active ? 0 : 1,
              transitionDelay: `${300 + index * 25}ms`,
            }}
          />
        );
      })}

      <div
        className={`
          absolute
          left-1/2
          top-[69%]
          -translate-x-1/2
          text-center
          transition-all
          delay-500
          duration-1000
          ${active ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
        `}
      >
        <p
          className="
            whitespace-nowrap
            text-[9px]
            uppercase
            tracking-[0.7em]
            text-yellow-100/65
          "
        >
          The Moon Remembered You
        </p>

        <p
          className="
            mt-5
            whitespace-nowrap
            font-serif
            text-xl
            italic
            text-white/75
          "
        >
          Opening our story...
        </p>
      </div>

      <div
        className={`
          absolute
          bottom-0
          left-1/2
          h-[34%]
          w-px
          -translate-x-1/2
          bg-gradient-to-b
          from-yellow-100/50
          to-transparent
          transition-all
          delay-500
          duration-1000
          ${active ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}
        `}
      />
    </div>
  );
}
