'use client';

import PageLayout from '@/components/PageLayout';
import NavigationButton from '@/components/NavigationButton';

const forgotten = [
  {
    title: '10 June',
    text: 'Maybe you forgot the day you said "I Love You Sunny". I still remember every feeling from that moment.',
  },
  {
    title: 'Your Videos',
    text: 'You may not know it, but I used to watch your videos every morning. They quietly became part of my routine.',
  },
  {
    title: 'The Chillies Promise',
    text: 'The day you asked me not to hurt myself by eating chillies again... I promised you I would stop. I still keep that promise.',
  },
  {
    title: 'That Cut',
    text: 'The day you hurt your hand after I asked you not to... I was upset because seeing you in pain hurts me too.',
  },
  {
    title: 'My Intentions',
    text: 'If I ever said something that hurt you, please know it was never my intention. My heart has always wanted your smile, never your tears.',
  },
];

export default function ForgotPage() {
  return (
    <PageLayout
      chapter="Chapter Three"
      title="Things You Might Have Forgotten"
      subtitle="Maybe these moments faded with time... but they never left my heart."
    >
      <div className="space-y-8">
        {forgotten.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-yellow-300/30 hover:bg-white/10"
          >
            <p className="mb-4 uppercase tracking-[6px] text-yellow-300">
              {item.title}
            </p>

            <p className="leading-8 text-gray-300">{item.text}</p>
          </div>
        ))}
      </div>

      <NavigationButton text="Continue" href="/sorry" />
    </PageLayout>
  );
}
