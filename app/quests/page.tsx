import QuestsSlider from '@/components/QuestsSlider';
import Image from 'next/image';

const QUESTS_COLLECTIONS_DATA_MOCK = [
  {
    name: 'Get Started',
    quests: [
      { name: 'Get Started', steps: 2, xp: 10 },
      { name: 'How to Bridge to Layer2s', steps: 3, xp: 25 },
      { name: 'Beyond Ethereum', steps: 4, xp: 50 },
      { name: 'NFTs for Beginners', steps: 3, xp: 75 },
      { name: 'Understanding DeFi Liquidity', steps: 2, xp: 10 },
      { name: 'Intro to On-Chain Swaps', steps: 3, xp: 50 },
    ],
  },
];

export default function Quests() {
  return (
    <div className="flex w-full lg:space-x-8 items-start">
      <div className="flex flex-col justify-start w-full lg:w-3/4">
        <div className="flex h-96 bg-slate-500 rounded-md"></div>
        {QUESTS_COLLECTIONS_DATA_MOCK.map((collection) => (
          <QuestsSlider key={collection.name} collection={collection.name} quests={collection.quests} />
        ))}
      </div>
      <div className="flex flex-col gap-6 lg:w-1/4 sticky top-24">
        <div className="flex h-52 bg-slate-700 rounded-lg"></div>
        <div className="flex h-52 bg-slate-700 rounded-lg"></div>
        <div className="flex h-52 bg-slate-700 rounded-lg"></div>
      </div>
    </div>
  );
}
