'use client';

import { usePathname } from 'next/navigation';

const pages = [
  { path: '/welcome', name: 'Welcome' },
  { path: '/journey', name: 'Journey' },
  { path: '/memories', name: 'Memories' },
  { path: '/remember', name: 'Remember' },
  { path: '/letter', name: 'Letter' },
  { path: '/sorry', name: 'Sorry' },
  { path: '/forgot', name: 'Forgot' },
  { path: '/promises', name: 'Promises' },
  { path: '/forever', name: 'Forever' },
  { path: '/end', name: 'End' },
];

export default function PageProgress() {
  const pathname = usePathname();

  const foundIndex = pages.findIndex((page) => page.path === pathname);

  const currentIndex = foundIndex >= 0 ? foundIndex : 0;

  const percentage = ((currentIndex + 1) / pages.length) * 100;

  const currentPage = pages[currentIndex] ?? pages[0];

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[100] h-px bg-white/[0.08]">
        <div
          className="h-full bg-gradient-to-r from-[#8f6227] via-[#f5db94] to-[#b78338] shadow-[0_0_14px_rgba(240,205,120,0.45)] transition-all duration-1000"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="pointer-events-none fixed left-5 top-6 z-[90] flex items-center gap-3 sm:left-8 sm:top-8">
        <span className="font-serif text-sm tracking-[0.2em] text-[#f3d995]">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>

        <span className="h-px w-7 bg-white/20" />

        <span className="text-[8px] uppercase tracking-[0.45em] text-white/35 sm:text-[9px]">
          {currentPage.name}
        </span>
      </div>

      <div className="pointer-events-none fixed right-5 top-6 z-[90] text-[9px] tracking-[0.25em] text-white/25 sm:right-8 sm:top-8">
        / {String(pages.length).padStart(2, '0')}
      </div>
    </>
  );
}
