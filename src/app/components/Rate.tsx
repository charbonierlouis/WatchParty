'use client';

import _ from 'lodash';

interface Props {
  value: number;
  id: string | number;
}

function Rate({ value, id }: Props) {
  const rate = _.round(value / 2);
  const tab = [1, 2, 3, 4, 5];
  return (
    <div className="rating">
      {tab.map((e) => (
        <input
          key={`${id}-${e}`}
          id={`${id}-${e}`}
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-primary w-[48px] h-[48px] lg:w-[24px] lg:h-[24px]"
          checked={e === rate}
          onChange={() => {}}
        />
      ))}
    </div>
  );
}

export default Rate;
