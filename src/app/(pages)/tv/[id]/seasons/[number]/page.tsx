import NotFound from '@/app/components/Errors/NotFound';
import {
  getSeason,
} from '@/app/services';
import Image from 'next/image';

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

//   const tvRequest = results.map((e) => getTvById(e.id));
//   const tv = await Promise.all(tvRequest);

//   const params = _.flatMap(tv, (e) => e.seasons.map((season) => ({
//     id: e.id.toString(),
//     number: season.season_number.toString(),
//   })));

//   return params;
// }

export const dynamic = 'force-dynamic';

interface Props {
  params: {
    id: string;
    number: string;
  }
}

async function SeasonsPage({
  params,
}: Props) {
  const season = await getSeason(Number(params.id), Number(params.number));

  if (!season.id) return <NotFound />;

  return (
    <>
      {season.episodes.map((episode) => (
        <div className="card card-side bg-base-300 shadow-xl">
          <figure>
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_SMALL}${episode.still_path}`}
              alt={episode.name}
              width={250}
              height={350}
              className="min-w-[150px] max-w-[150px] h-full"
            />
          </figure>
          <div className="card-body w-min">
            <h2 className="card-title">{episode.name}</h2>
            <p>{episode.overview}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default SeasonsPage;
