export type QuestCardProps = {
  quest: {
    name: string;
    steps: number;
    xp: number;
  };
};

export default function QuestCard({ quest }: QuestCardProps) {
  return (
    <div className="flex flex-col justify-start p-1 bg-slate-700 rounded-xl h-80">
      <div className="h-52 rounded-xl bg-slate-400"></div>

      <div className="flex flex-col grow justify-between p-3 ">
        <div className="flex flex-col gap-2">
          <div className="flex h-1 gap-1">
            {Array.from({ length: quest.steps }).map((step, i) => (
              <div key={`${quest.name}-step-${i}`} className="h-full min-w-0 grow rounded-full bg-slate-600"></div>
            ))}
          </div>
          <div>{quest.name}</div>
        </div>
        <div className="flex">XP: {quest.xp}</div>
      </div>
    </div>
  );
}
