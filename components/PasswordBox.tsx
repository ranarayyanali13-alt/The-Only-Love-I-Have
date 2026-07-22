'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { hints, PASSWORD } from '../data/messages';
import UnlockTransition from './UnlockTransition';

export default function PasswordBox() {
  const router = useRouter();

  const [text, setText] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [message, setMessage] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shaking, setShaking] = useState(false);

  function checkPassword() {
    if (unlocked) return;

    const enteredPassword = text.trim().toLowerCase();

    if (enteredPassword === PASSWORD.trim().toLowerCase()) {
      setUnlocked(true);
      setMessage('');

      window.setTimeout(() => {
        router.push('/welcome');
      }, 2600);

      return;
    }

    setShaking(false);

    window.setTimeout(() => {
      setShaking(true);
    }, 10);

    if (attempt < hints.length) {
      setMessage(hints[attempt]);
      setAttempt((previous) => previous + 1);
    } else {
      setMessage(
        'Maybe this is what my heart wanted to hear...\n\nI Love U Yaan ❤️'
      );
    }
  }

  return (
    <>
      <div
        className={`
          relative
          mx-auto
          flex
          w-full
          max-w-md
          flex-col
          items-center
          transition-all
          duration-1000
          ${
            unlocked
              ? 'scale-110 opacity-0 blur-md'
              : 'scale-100 opacity-100 blur-0'
          }
        `}
      >
        <div
          className={`
            relative
            w-full
            rounded-[30px]
            border
            border-white/[0.1]
            bg-white/[0.035]
            p-3
            shadow-[0_30px_80px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
            transition-all
            duration-500
            ${shaking ? 'animate-[passwordShake_0.45s_ease]' : ''}
          `}
          onAnimationEnd={() => {
            setShaking(false);
          }}
        >
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[30px]
              bg-gradient-to-br
              from-yellow-100/[0.06]
              via-transparent
              to-transparent
            "
          />

          <div className="relative flex items-center">
            <span
              className="
                pointer-events-none
                absolute
                left-5
                text-lg
                text-yellow-100/65
              "
            >
              ☾
            </span>

            <input
              type={showPassword ? 'text' : 'password'}
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                setMessage('');
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  checkPassword();
                }
              }}
              placeholder="Enter the words..."
              autoComplete="off"
              spellCheck={false}
              className="
                min-h-[60px]
                w-full
                rounded-[22px]
                border
                border-white/[0.08]
                bg-black/35
                px-14
                py-4
                text-center
                font-serif
                text-lg
                tracking-[0.04em]
                text-white
                caret-yellow-200
                outline-none
                transition-all
                duration-500
                placeholder:text-white/20
                focus:border-yellow-200/35
                focus:bg-black/50
                focus:shadow-[0_0_0_4px_rgba(232,201,120,0.05)]
              "
            />

            <button
              type="button"
              onClick={() => {
                setShowPassword((previous) => !previous);
              }}
              className="
                absolute
                right-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.025]
                text-sm
                text-white/35
                transition-all
                duration-300
                hover:border-yellow-200/30
                hover:text-yellow-100
                active:scale-90
              "
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '◌' : '◉'}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={checkPassword}
          disabled={unlocked}
          className="
            group
            relative
            mt-7
            min-h-[58px]
            min-w-[220px]
            cursor-pointer
            overflow-hidden
            rounded-full
            border
            border-yellow-200/25
            bg-white/[0.025]
            px-10
            py-4
            font-serif
            text-[15px]
            tracking-[0.04em]
            text-white
            shadow-[0_18px_50px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
            transition-all
            duration-500
            hover:-translate-y-1
            hover:border-yellow-100/60
            active:scale-[0.97]
            disabled:cursor-wait
          "
        >
          <span
            className="
              absolute
              inset-0
              -translate-x-[105%]
              bg-gradient-to-r
              from-[#fff1bd]
              via-[#d9b45d]
              to-[#9f6c28]
              transition-transform
              duration-500
              ease-out
              group-hover:translate-x-0
            "
          />

          <span
            className="
              relative
              z-10
              flex
              items-center
              justify-center
              gap-3
              transition-colors
              duration-500
              group-hover:text-black
            "
          >
            <span>
              {unlocked ? 'Opening Our Story...' : 'Unlock Under The Moon'}
            </span>

            <span
              className="
                text-lg
                transition-transform
                duration-500
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </span>
        </button>

        <div className="mt-8 min-h-[82px] w-full">
          {message && (
            <div
              className="
                animate-[passwordMessage_0.65s_ease_both]
                rounded-[22px]
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-6
                py-5
                text-center
                shadow-[0_18px_50px_rgba(0,0,0,0.25)]
                backdrop-blur-xl
              "
            >
              <p
                className="
                  whitespace-pre-line
                  font-serif
                  text-base
                  leading-7
                  text-white/50
                "
              >
                {message}
              </p>

              <div
                className="
                  mx-auto
                  mt-4
                  h-px
                  w-20
                  bg-gradient-to-r
                  from-transparent
                  via-yellow-200/35
                  to-transparent
                "
              />
            </div>
          )}
        </div>
      </div>

      <UnlockTransition active={unlocked} />
    </>
  );
}
