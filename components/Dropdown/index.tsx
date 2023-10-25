'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import Image from 'next/image';
import { useState } from 'react';

export type DropdownProps = {
  label: string;
  selected: any;
  options: any[];
  onSelect: (option: any) => any;
};

export default function Dropdown(props: DropdownProps) {
  const [menuVisibility, setMenuVisibility] = useState('hidden');
  const ref = useOutsideClick(() => setMenuVisibility('hidden'));

  return (
    <div>
      <div className="text-sm mb-2">{props.label}</div>
      <div className="relative">
        <button className="flex" onClick={() => setMenuVisibility('block')}>
          <div className="relative rounded-full overflow-hidden w-5 h-5 sm:w-6 sm:h-6">
            <Image alt={props.selected.name} src={props.selected.icon} fill={true} />
          </div>
          <div className="ml-1">{props.selected.name}</div>
        </button>
        <div
          ref={ref}
          className={`absolute left-0 top-8 z-50 max-h-[300px] overflow-hidden overflow-y-auto rounded-md border-2 border-slate-500 ${menuVisibility}`}
        >
          {props.options.map((option) => (
            <button
              key={option.name}
              onClick={() => {
                setMenuVisibility('hidden');
                props.onSelect(option);
              }}
              className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-2 flex-shrink-0 w-full min-w-[190px]"
            >
              <span className="flex items-center">
                <div className="relative flex h-fit w-fit">
                  <div className="relative rounded-full overflow-hidden w-5 h-5 sm:w-6 sm:h-6">
                    <Image alt={option.name} src={option.icon} fill={true} />
                  </div>
                </div>
                <span className="ml-1 -mb-0.5 font-medium text-socket-primary sm:text-lg">{option.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
