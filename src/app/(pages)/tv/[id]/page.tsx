import {
  getByGenre, getGenres, getLatest, getPopulars, getSeason, getTopRated, getTvById,
} from '@/app/services';
import { TvShow, TvShowDetails } from '@/app/types/TvShow';
import { REVALIDATE } from '@/app/utils';
import _ from 'lodash';
import Link from 'next/link';
import NotFound from '@/app/components/Errors/NotFound';
import Season from './components/Season';

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
  const item: TvShowDetails = await getTvById(Number(params.id));

  if (!item) {
    return <NotFound />;
  }

  const defaultSeason = item.seasons?.length ? item.seasons[item.seasons.length - 1] : null;
  const seasonDetail = await getSeason(Number(params.id), defaultSeason?.season_number || 0);

  if (!seasonDetail) {
    return <NotFound />;
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5">
        {item.seasons.length && (
          <>
            <Season
              season={seasonDetail}
              tvId={item.id}
            />
            {item.seasons?.length > 1 && (
            <Link
              href={`/tv/${params.id}/seasons`}
              className="btn btn-base w-fit"
            >
              Voir toutes les saisons
            </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TvPage;
