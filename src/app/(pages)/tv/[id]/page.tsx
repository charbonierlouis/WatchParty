import SeasonsLoader from '@/app/loaders/SeasonsLoader';
import {
  getByGenre, getGenres, getLatest, getPopulars, getTopRated,
} from '@/app/services';
import { TvShow, TvShowDetails } from '@/app/types/TvShow';
import { REVALIDATE, getApiUrl } from '@/app/utils';
import _ from 'lodash';
import { Suspense } from 'react';
import Seasons from '@/app/components/Seasons';

export const revalidate = REVALIDATE.ONE_DAY;

export async function generateStaticParams() {
  const { genres } = await getGenres();

  const byGenre = genres.map((genre) => getByGenre(genre.id));

  const topRated = getTopRated();
  const latest = getLatest();
  const populars = getPopulars();

  const [
    topRatedResponse,
    latestResponse,
    popularsResponse,
    ...rest
  ] = await Promise.all([topRated, latest, populars, ...byGenre]);

  const byGenreResult = _.flatMap(rest, (r) => r.results);

  const results: TvShow[] = [
    ...topRatedResponse.results,
    ...latestResponse.results,
    ...popularsResponse.results,
    ...byGenreResult,
  ];

  return results.map((show) => ({
    id: show.id.toString(),
  }));
}

interface Props {
  params: {
    id: string;
  }
}

async function TvPage({
  params,
}: Props) {
  const res = await fetch(getApiUrl(`/tv/${params.id}`, false), {
    next: {
      revalidate: 60,
    },
  });
  const item: TvShowDetails = await res.json();

  return (
    <Suspense fallback={(
      <div className="flex flex-col gap-5">
        {item.seasons.map(() => (
          <SeasonsLoader />
        ))}
      </div>
      )}
    >
      {/* @ts-expect-error Server Component */}
      <Seasons
        tvShow={item}
      />
    </Suspense>
  );
}

export default TvPage;
