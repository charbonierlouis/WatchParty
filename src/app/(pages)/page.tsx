// eslint-disable-next-line import/extensions
import { Suspense } from 'react';
import GenreList from '../components/GenreList';
import Latest from '../components/Latests';
import Populars from '../components/Populars';
import SearchBar from '../components/SearchBar';
import TopRated from '../components/TopRated';
import { REVALIDATE } from '../utils';
import TvListLoader from '../loaders/TvListLoader';

export const revalidate = REVALIDATE.ONE_DAY;

function Homepage() {
  return (
    <div className="flex flex-col gap-5">
      <SearchBar>
        {/* @ts-expect-error Server Component */}
        <GenreList />
      </SearchBar>

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
    </div>
  );
}

export default Homepage;
