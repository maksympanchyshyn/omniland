import QuestsSlider from '@/components/QuestsSlider';

async function getData() {
  const res = await fetch('http://localhost:3000/api/quests', { cache: 'no-store' });
  const result = await res.json();
  return result.data;
}

export default async function Quests() {
  const questsCollections = await getData();
  return (
    <div className="flex w-full lg:space-x-8 items-start">
      <div className="flex flex-col justify-start w-full lg:w-3/4">
        <div className="flex h-96 bg-slate-500 rounded-md"></div>
        {questsCollections.map((collection: any) => (
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
