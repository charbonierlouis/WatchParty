'use client';

import Container from '@/app/components/Container';
import Latest from '@/app/components/Latests';
import Populars from '@/app/components/Populars';
import SimpleCard from '@/app/components/SimpleCard';
import TopRated from '@/app/components/TopRated';
import { useList } from '@/app/hooks/useList';
import TvListLoader from '@/app/loaders/TvListLoader';
import { REVALIDATE } from '@/app/utils';
import { Suspense } from 'react';

export const revalidate = REVALIDATE.ONE_DAY;

function ListPage() {
  const { items } = useList();

  if (!items) return null;
  return (
    <Container>
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
      <Suspense fallback={<TvListLoader />}>
        {/* @ts-expect-error Server Component */}
        <Latest />
      </Suspense>

      <Suspense fallback={<TvListLoader />}>
        {/* @ts-expect-error Server Component */}
        <Populars />
      </Suspense>

      <Suspense fallback={<TvListLoader />}>
        {/* @ts-expect-error Server Component */}
        <TopRated />
      </Suspense>
    </Container>
  );
}

export default ListPage;
