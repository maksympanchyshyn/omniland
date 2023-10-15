import QuestsSlider from '@/components/QuestsSlider';
import Image from 'next/image';

export default function Quests() {
  return (
    <div className="flex w-full lg:space-x-8 items-start">
      <div className="flex flex-col justify-start w-full lg:w-3/4">
        <div className="flex h-96 bg-slate-500"></div>
        <QuestsSlider collection="Get Started" quests={[1, 2, 3, 4, 5]} />
        <QuestsSlider collection="L2 Journey" quests={[1, 2, 3, 4, 5, 6, 7]} />
      </div>
      <div className="flex flex-col lg:w-1/4 sticky top-24">
        <div className="flex h-96 bg-slate-700"></div>
      </div>
    </div>
  );
}
