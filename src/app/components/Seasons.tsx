/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState } from 'react';
import { Season, TvShowDetails } from '../types/TvShow';
import Episodes from './Episodes';

interface Props {
  tvShowId: number;
  seasons: TvShowDetails['seasons'];
}

function Seasons({ tvShowId, seasons }: Props) {
  const [selected, setSelected] = useState<Season | null>(seasons[0] || null);

  const handleClick = (e: Season) => {
    setSelected(e);
  };

  return (
    <>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
          {selected?.name}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {seasons?.map((e) => (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => handleClick(e)}
                className={`${selected?.id === e.id ? 'bg-primary' : ''}`}
              >
                {e.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {!!selected && (
        <div>
          <Episodes
            tvShowId={tvShowId}
            seasonNumber={selected?.season_number}
          />
        </div>
      )}
    </>
  );
}

export default Seasons;
