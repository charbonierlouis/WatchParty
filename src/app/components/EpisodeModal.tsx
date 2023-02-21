'use client';

import Image from 'next/image';
import useSWR from 'swr';
import { EpisodeDetails } from '../types/TvShow';
import { fetcher } from '../utils';

interface Props {
  tvId: number;
  seasonNumber: number;
  episodeNumber: number;
}

function EpisodeModal({
  tvId,
  episodeNumber,
  seasonNumber,
}: Props) {
  const { data: episode, error, isLoading } = useSWR<EpisodeDetails>(`/api/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`, fetcher);

  if (!episode || error || isLoading) {
    return null;
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-3">
      <div className="w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA}${episode.still_path}`}
          alt={episode.name}
          width={250}
          height={250}
          className="w-full"
        />
      </div>
      <div className="w-full flex flex-col gap-5">
        <h2 className="text-2xl">{episode.name}</h2>
        <span className="text-sm">{`Durée: ${episode.runtime} min`}</span>
        <p>{episode.overview}</p>
      </div>
    </div>
  );
}

export default EpisodeModal;
