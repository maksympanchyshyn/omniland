'use client';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import QuestCard from '../QuestCard';

export type QuestsSliderProps = {
  collection: string;
  quests: any[];
};

export default function QuestsSlider(props: QuestsSliderProps) {
  return (
    <div className="flex flex-col mt-10">
      <CarouselProvider
        visibleSlides={4}
        totalSlides={props.quests.length}
        step={4}
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        isIntrinsicHeight={true}
        dragEnabled={false}
      >
        <div className="flex justify-between mb-3">
          <div>{props.collection}</div>
          <div className="flex space-between">
            <ButtonBack>
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
            </ButtonBack>
            <ButtonNext>
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
            </ButtonNext>
          </div>
        </div>
        <Slider className="-mx-2">
          {props.quests.map((quest) => (
            <Slide key={quest} index={0}>
              <QuestCard quest={quest} />
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </div>
  );
}
