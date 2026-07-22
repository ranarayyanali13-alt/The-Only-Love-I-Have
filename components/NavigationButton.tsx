'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
  const pathname = usePathname();
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    document.body.classList.remove('page-is-leaving');
    setIsLeaving(false);

    return () => {
      document.body.classList.remove('page-is-leaving');
    };
  }, [pathname]);

  function handleNavigation() {
    if (isLeaving) return;

    setIsLeaving(true);
    document.body.classList.add('page-is-leaving');

    window.setTimeout(() => {
      document.body.classList.remove('page-is-leaving');
      router.push(href);
    }, 500);
  }

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
        text-white
        shadow-[0_18px_55px_rgba(0,0,0,0.35)]
        backdrop-blur-xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-yellow-200/60
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
          group-hover:translate-x-0
        "
      />

      <span className="relative z-10 flex items-center gap-4 transition-colors duration-500 group-hover:text-black">
        {direction === 'back' && <span>←</span>}

        <span>{isLeaving ? loadingLabel : label}</span>

        {direction === 'next' && <span>→</span>}
      </span>
    </button>
  );
}