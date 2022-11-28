import React, { useCallback, useEffect } from 'react';

export declare interface SelectInterface {
  name: string
  value: any
  isError?: boolean
  onChange: (data: React.FormEvent<HTMLInputElement>) => void
  onBlur?: () => void
}

const Select = ({ name }: SelectInterface): JSX.Element => {
  const handleEnterSubmit = useCallback((event: KeyboardEvent) => {
    const { key } = event;

    if (key === 'Enter') {
      console.log('object');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleEnterSubmit);

    return () => window.removeEventListener('keydown', handleEnterSubmit);
  }, []);

  return (
  <div className="flex flex-col items-center">
  <div className="w-full md:w-1/2 flex flex-col items-center h-64">
  <div className="w-full px-4">
  <div className="flex flex-col items-center relative">
  <div className="w-full">
  <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
  <div className="flex flex-auto flex-wrap"></div>
  <input name={name} placeholder="Search by position" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
  <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
  <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
  <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
  </button>
  </div>
  </div>
  </div>
  <div className="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
  <div className="flex flex-col w-full">
  <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100">
  <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
  <div className="w-6 flex flex-col items-center">
  <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 mt-1 rounded-full "><img className="rounded-full" alt="A" src="https://randomuser.me/api/portraits/men/62.jpg" /> </div>
  </div>
  <div className="w-full items-center flex">
  <div className="mx-2 -mt-1  ">Jack jhon
  <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">CEO &amp; managin director</div>
  </div>
  </div>
  </div>
  </div>
  <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
  <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
  <div className="w-6 flex flex-col items-center">
  <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 mt-1 rounded-full "><img className="rounded-full" alt="A" src="https://randomuser.me/api/portraits/women/62.jpg" /> </div>
  </div>
  <div className="w-full items-center flex">
  <div className="mx-2 -mt-1  ">Liza Blue
  <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">COO &amp; co-founder</div>
  </div>
  </div>
  </div>
  </div>
  <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
  <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
  <div className="w-6 flex flex-col items-center">
  <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 mt-1 rounded-full "><img className="rounded-full" alt="A" src="https://randomuser.me/api/portraits/men/65.jpg" /> </div>
  </div>
  <div className="w-full items-center flex">
  <div className="mx-2 -mt-1 w-1/2 ">Brian White
  <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">CTO &amp; technical manager</div>
  </div>
  <div className="w-1/2 flex">
  <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 border border-teal-300 ">
  <div className="text-xs font-normal leading-none max-w-full flex-initial">Hiring!</div>
  </div>
  </div>
  </div>
  </div>
  </div>
  <div className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-teal-100">
  <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
  <div className="w-6 flex flex-col items-center">
  <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 mt-1 rounded-full "><img className="rounded-full" alt="A" src="https://randomuser.me/api/portraits/men/85.jpg" /> </div>
  </div>
  <div className="w-full items-center flex">
  <div className="mx-2 -mt-1  ">Eric Dripper
  <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">CMO &amp; marketing manager</div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  );
};

export default Select;
