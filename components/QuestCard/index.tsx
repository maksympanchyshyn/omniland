import Image from 'next/image';

export type QuestCardProps = {
  quest: {
    name: string;
    img: string;
    steps: { passed: boolean }[];
    xp: number;
  };
};

export default function QuestCard({ quest }: QuestCardProps) {
  return (
    <div className="flex flex-col justify-start p-1 bg-slate-700 rounded-xl h-80">
      <div className="h-52 relative">
        <Image
          alt={quest.name}
          fill={true}
          src={quest.img}
          className="absolute inset-none h-full w-full rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col grow justify-between p-3 ">
        <div className="flex flex-col gap-2">
          <div className="flex h-1 gap-1">
            {quest.steps.map((step, i) => (
              <div
                key={`${quest.name}-step-${i}`}
                className={`h-full min-w-0 grow rounded-full ${step.passed ? 'bg-green-600' : 'bg-slate-600'}`}
              ></div>
            ))}
          </div>
          <div>{quest.name}</div>
        </div>
        <div className="flex">XP: {quest.xp}</div>
      </div>
    </div>
  );
}
