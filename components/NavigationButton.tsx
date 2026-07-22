'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type NavigationButtonProps = {
  href: string;
  label: string;
  loadingLabel?: string;
  direction?: 'next' | 'back';
  className?: string;
};

export default function NavigationButton({
  href,
  label,
  loadingLabel = 'Opening...',
  direction = 'next',
  className = '',
}: NavigationButtonProps) {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleNavigation = () => {
    if (isLeaving) return;

    setIsLeaving(true);

    document.body.classList.add('page-is-leaving');

    window.setTimeout(() => {
      router.push(href);
    }, 650);
  };

  return (
    <button
      type="button"
      onClick={handleNavigation}
      disabled={isLeaving}
      className={`
        group
        relative
        inline-flex
        min-h-[58px]
        min-w-[190px]
        cursor-pointer
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-white/20
        bg-white/[0.035]
        px-9
        py-4
        font-serif
        text-[15px]
        tracking-[0.04em]
        text-white
        shadow-[0_18px_55px_rgba(0,0,0,0.35)]
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#e8c978]/65
        hover:shadow-[0_22px_70px_rgba(210,170,80,0.12)]
        active:scale-[0.97]
        disabled:cursor-wait
        disabled:opacity-60
        ${className}
      `}
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
          gap-4
          transition-colors
          duration-500
          group-hover:text-black
        "
      >
        {direction === 'back' && (
          <span className="text-lg transition-transform group-hover:-translate-x-1">
            ←
          </span>
        )}

        <span>{isLeaving ? loadingLabel : label}</span>

        {direction === 'next' && (
          <span className="text-lg transition-transform group-hover:translate-x-1">
            →
          </span>
        )}
      </span>
    </button>
  );
}
