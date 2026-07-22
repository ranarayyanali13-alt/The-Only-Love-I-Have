export default function GlassHeart() {
  return (
    <div className="mb-12 flex justify-center">
      <div className="relative flex items-center justify-center floating-slow">
        {/* Main Glow */}

        <div className="absolute h-[340px] w-[340px] rounded-full bg-yellow-200/10 blur-[120px]" />

        <div className="absolute h-[260px] w-[260px] rounded-full border border-yellow-100/10" />

        <div className="absolute h-[190px] w-[190px] rounded-full border border-white/5" />

        {/* Moon */}

        <div className="relative">
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            className="drop-shadow-[0_0_40px_rgba(255,230,170,0.18)]"
          >
            <defs>
              <radialGradient id="moonGradient" cx="30%" cy="25%">
                <stop offset="0%" stopColor="#fff8e8" />

                <stop offset="45%" stopColor="#ecd39b" />

                <stop offset="100%" stopColor="#b78638" />
              </radialGradient>
            </defs>

            <circle cx="110" cy="110" r="70" fill="url(#moonGradient)" />

            <circle cx="138" cy="92" r="62" fill="#020202" />
          </svg>

          {/* Shine */}

          <div className="absolute left-[52px] top-[44px] h-10 w-4 rotate-[-25deg] rounded-full bg-white/60 blur-sm" />
        </div>

        {/* Orbit Stars */}

        <span className="absolute left-3 top-10 text-xl text-yellow-100 animate-pulse">
          ✦
        </span>

        <span
          className="absolute right-5 bottom-12 text-lg text-yellow-200 animate-pulse"
          style={{
            animationDelay: '1s',
          }}
        >
          ✦
        </span>

        <span
          className="absolute right-10 top-4 text-sm text-white animate-pulse"
          style={{
            animationDelay: '2s',
          }}
        >
          ✧
        </span>
      </div>
    </div>
  );
}
