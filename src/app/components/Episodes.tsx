'use clients';

import useSWR from 'swr';
import { SeasonDetails } from '../types/TvShow';
import EpisodeCard from './EpisodeCard';
import { fetcher } from '../utils';

interface Props {
  tvShowId: number;
  seasonNumber: number;
}

function Episodes({
  tvShowId,
  seasonNumber,
}: Props) {
  const { data, error, isLoading } = useSWR<SeasonDetails>(`/api/tv/${tvShowId}/season/${seasonNumber}`, fetcher);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        { Array(10).fill(true).map(() => (
          <div className="w-full h-[196px] card card-side bg-base-300 shadow-xl animate-pulse">
            <div className="w-[250px] h-full bg-base-200" />
          </div>
        ))}
      </div>
    );
  }

  if (!data?.episodes?.length || error) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.episodes.filter((e) => !!e.still_path).map((e) => (
        <EpisodeCard
          key={e.id}
          item={e}
        />
      ))}
    </div>
  );
}

export default Episodes;
