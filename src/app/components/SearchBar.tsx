'use client';

/* eslint-disable import/extensions */

import { ReactNode, useState } from 'react';
import { TvShow } from '../types/TvShow';
import { List } from '../types/Api';
import SimpleCard from './SimpleCard';
import { REVALIDATE } from '../utils';

interface Props {
  children?: ReactNode;
}

function SearchBar({
  children,
}: Props) {
  const [value, setValue] = useState<string>('');
  const [tv, setTv] = useState<TvShow[]>([]);

  const handleChange = (
    newValue: string,
  ) => {
    setValue(newValue);
  };

  const handleSubmit = async () => {
    const result = await fetch(`/api/search/tv/${value}`, {
      next: {
        revalidate: REVALIDATE.ONE_DAY,
      },
    });
    const data: List<TvShow> = await result.json();
    setTv(data.results.filter((e) => !!e.poster_path));
  };

  return (
    <>
      <div className="flex flex-col items-center text-2xl">
        <h2>Trouver une série : </h2>
        <div className="w-full flex justify-center py-5">
          <div className="form-control w-full md:max-w-[450px]">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered w-full"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
              />
              <button
                className="btn btn-square btn-primary"
                type="button"
                onClick={handleSubmit}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>
      {tv.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {tv.map((item: TvShow) => (
            <SimpleCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default SearchBar;
