import { getSession } from 'next-auth/react';
import ListItemCard from './ListItemCard';
import { getList } from '../services';

export default async function List() {
  const session = await getSession();
  if (!session) return null;

  const list = await getList(session.user.id);

  if (!list) return null;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl">Ma liste</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {list.listItem.map((item, i) => (
          <>
            { /* @ts-expect-error Server Component */ }
            <ListItemCard
              key={item.id}
              id={item.itemId}
              priority={i === 0}
            />
          </>
        ))}
      </div>
    </div>
  );
}
