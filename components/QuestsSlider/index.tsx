export type QuestsSliderProps = {
  collection: string;
  quests: any[];
};

export default function QuestsSlider(props: QuestsSliderProps) {
  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-between mb-3">
        <div>{props.collection}</div>
        <div className="flex space-between">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="h-80 w-1/3 bg-slate-400 rounded-xl"></div>
        <div className="h-80 w-1/3 bg-slate-400 rounded-xl"></div>
        <div className="h-80 w-1/3 bg-slate-400 rounded-xl"></div>
      </div>
    </div>
  );
}
