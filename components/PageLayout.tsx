import type { ReactNode } from 'react';
import PageProgress from '@/components/PageProgress';

type PageLayoutProps = {
  children: ReactNode;
  eyebrow?: string;
  pageClassName?: string;
  showProgress?: boolean;
};

export default function PageLayout({
  children,
  eyebrow,
  pageClassName = '',
  showProgress = true,
}: PageLayoutProps) {
  return (
    <main
      className={`
        premium-page
        relative
        min-h-screen
        overflow-x-hidden
        bg-[#030303]
        text-white
        ${pageClassName}
      `}
    >
      {showProgress ? <PageProgress /> : null}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(219,177,86,0.12),transparent_35%)]" />

        <div className="absolute -left-56 top-[18%] h-[540px] w-[540px] rounded-full bg-amber-500/[0.055] blur-[170px]" />

        <div className="absolute -right-56 bottom-[10%] h-[560px] w-[560px] rounded-full bg-yellow-100/[0.045] blur-[180px]" />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.78))]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(rgba(255,255,255,0.7)_0.5px,transparent_0.5px)] [background-size:6px_6px]" />

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
      </div>

      {eyebrow ? (
        <div className="pointer-events-none fixed bottom-7 left-1/2 z-30 hidden -translate-x-1/2 text-[8px] uppercase tracking-[0.7em] text-white/20 lg:block">
          {eyebrow}
        </div>
      ) : null}

      <div className="relative z-20">{children}</div>
    </main>
  );
}
