'use client';

import { useList } from '../hooks/useList';
import SimpleCard from './SimpleCard';

export default function List() {
  const { items } = useList();
  if (!items) return null;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl">Ma liste</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {items.map((e) => (
          <SimpleCard
            key={e.id}
            item={e}
          />
        ))}
      </div>
    </div>
  );
}