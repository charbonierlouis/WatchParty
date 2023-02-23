import { SeasonDetails } from '@/app/types/TvShow';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  tvId: number;
  season: SeasonDetails;
}

function SeasonCard({
  tvId,
  season,
}: Props) {
  return (
    <Link
      href={`/tv/${tvId}/seasons/${season.season_number}`}
    >
      <div className="card card-side bg-base-300 shadow-xl group">
        <figure>
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA}${season.poster_path}`}
            alt={season.name}
            width={250}
            height={350}
            className="w-[150px]"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title group-hover:underline">{season.name}</h2>
          <p>
            {season.air_date}
            {' '}
            |
            {' '}
            {season.episodes?.length}
            {' '}
            épisodes
          </p>
        </div>
      </div>
    </Link>
  );
}

export default SeasonCard;
