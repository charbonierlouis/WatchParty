'use client';

import _ from 'lodash';

interface Props {
  value: number;
  id: string | number;
}

function Rate({ value, id }: Props) {
  const rate = _.round(value / 2);
  const tab = _.fill(Array(5), rate);
  return (
    <div className="rating">
      {tab.map((e, i) => (
        <input
          key={`${id}-${e}`}
          id={`${id}-${e}`}
          type="radio"
          name="rating-2"
          className="mask mask-star-2 bg-primary"
          checked={i === 3}
          onChange={() => {}}
        />
      ))}
    </div>
  );
}

export default Rate;
