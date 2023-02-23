import Container from '@/app/components/Container';
import Latest from '@/app/components/Latests';
import List from '@/app/components/List';
import Populars from '@/app/components/Populars';
import TopRated from '@/app/components/TopRated';
import TvListLoader from '@/app/loaders/TvListLoader';
import { REVALIDATE } from '@/app/utils';
import { Suspense } from 'react';

export const revalidate = REVALIDATE.ONE_DAY;

function ListPage() {
  return (
    <Container>
      <List />
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
