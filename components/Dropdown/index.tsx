'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import Image from 'next/image';
import { useState } from 'react';

export interface DropdownOption {
  name: string;
  icon?: string;
}

export interface DropdownProps<T> {
  selected: T;
  options: T[];
  onSelect: (option: T) => void;
}

export default function Dropdown<Option extends DropdownOption>(props: DropdownProps<Option>) {
  const [isActive, setIsActive] = useState(false);
  const ref = useOutsideClick(() => setIsActive(false));

  const optionClasses = 'flex items-center justify-between p-2 w-full';

  const optionContent = (option: Option) => (
    <span className="flex items-center">
      {option.icon && (
        <div className="flex">
          <div className="relative w-5 h-5 mr-3">
            <Image alt={option.name} src={option.icon} fill={true} />
          </div>
        </div>
      )}
      <span>{option.name}</span>
    </span>
  );

  return (
    <div className="relative w-full">
      <div className="flex rounded-md border border-slate-500">
        <button className={`${optionClasses} `} onClick={() => setIsActive(!isActive)}>
          {optionContent(props.selected)}
          <span className="mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`transition-all w-5 h-5 ${isActive ? 'rotate-180' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </button>
      </div>

      <div ref={ref} className={`dropdown-menu ${isActive ? 'active' : ''} `}>
        <div className="mt-2 rounded-md border border-slate-500 overflow-hidden overflow-y-auto">
          {props.options.map((option) => (
            <button
              key={option.name}
              className={`${optionClasses}  bg-slate-800 hover:bg-slate-700`}
              onClick={() => {
                setIsActive(false);
                props.onSelect(option);
              }}
            >
              {optionContent(option)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
