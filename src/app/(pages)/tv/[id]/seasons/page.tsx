/* eslint-disable no-unused-vars */
import {
  getSeason, getTvById,
} from '@/app/services';
import { TvShowDetails } from '@/app/types/TvShow';
import _ from 'lodash';
import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi';
import SeasonCard from '../components/Season';

// export const revalidate = REVALIDATE.ONE_DAY;

// export async function generateStaticParams() {
//   const { genres } = await getGenres();

//   const byGenre = genres.map((genre) => getByGenre(genre.id));

//   const topRated = getTopRated();
//   const latest = getLatest();
//   const populars = getPopulars();

//   const [
//     topRatedResponse,
//     latestResponse,
//     popularsResponse,
//     ...rest
//   ] = await Promise.all([topRated, latest, populars, ...byGenre]);

//   const byGenreResult = _.flatMap(rest, (r) => r.results);

//   const results: TvShow[] = [
//     ...topRatedResponse.results,
//     ...latestResponse.results,
//     ...popularsResponse.results,
//     ...byGenreResult,
//   ];

//   return results.map((show) => ({
//     id: show.id.toString(),
//   }));
// }

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    id: string;
  }
}

async function SeasonsPage({
  params,
}: Props) {
  const item: TvShowDetails = await getTvById(Number(params.id));

  if (!item) {
    throw new Error('TvShow not found');
  }

  const detailsRequest = item.seasons.map((e) => getSeason(Number(params.id), e.season_number));
  const details = await Promise.all(detailsRequest);

  if (!details?.length) {
    throw new Error('Seasons not found');
  }

  return (
    <div className="flex flex-col gap-5">
      <Link href={`/tv/${params.id}`} className="hover:underline flex gap-2">
        <HiChevronLeft size={32} />
        <h2 className="text-2xl">{item.name}</h2>
      </Link>
      {details.sort((a, b) => b.season_number - a.season_number).map((season) => (
        <SeasonCard
          key={season.id}
          tvId={Number(params.id)}
          season={season}
        />
      ))}
    </div>
  );
}

export default SeasonsPage;
