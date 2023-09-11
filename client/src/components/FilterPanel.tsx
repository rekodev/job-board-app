import React, { useState } from 'react';
import FilterPanelDropdown from './FilterPanelDropdown';

const FilterPanel = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className=' text-sm h-14 w-full dark:text-white relative'>
      {dropdownOpen && <FilterPanelDropdown />}
      <div className='flex items-center h-full py-4 px-2'>
        <div className='flex items-center border-r border-solid border-gray-400 h-full pr-2'>
          <button
            className='flex items-center justify-items-center h-full gap-2'
            id='headlessui-disclosure-button-1'
            type='button'
            aria-expanded='false'
            onClick={toggleDropdown}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='#fff'
              aria-hidden='true'
              className='w-5'
            >
              <path
                fill-rule='evenodd'
                d='M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z'
                clip-rule='evenodd'
              ></path>
            </svg>
            2 Filters
          </button>
        </div>
        <div className='pl-2'>
          <button type='button' className='axr'>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
