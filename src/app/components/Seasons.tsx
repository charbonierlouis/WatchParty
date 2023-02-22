'use client';

import Image from 'next/image';
import { SeasonDetails } from '../types/TvShow';
import EpisodeCard from './EpisodeCard';

interface Props {
  seasons: SeasonDetails[];
}

function Season({
  seasons,
}: Props) {
  const filtredSeason = seasons.filter((e) => !!e.poster_path);

  return (
    <div className="flex flex-col gap-5">
      {filtredSeason.map((season) => {
        const filtredEpisode = season.episodes.filter((e) => !!e.still_path);
        return (
          <div key={season.id} className="collapse rounded-lg bg-base-300 shadow-xl">
            <input type="checkbox" className="peer" />
            <div className="collapse-title flex gap-5 p-0 items-center">
              {season.poster_path && (
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA}${season.poster_path}`}
                alt={season.name}
                width={250}
                height={350}
                className="w-[150px]"
              />
              )}
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">
                  {season.name}
                </h2>
                <p className="text-sm">
                  {season.air_date}
                  {' '}
                  |
                  {' '}
                  {filtredEpisode.length}
                  {' '}
                  épisodes
                </p>
                <p className="hidden lg:block">
                  {season.overview}
                </p>
                <p className="block lg:hidden">
                  {season.overview.substring(0, 100)}
                </p>
              </div>
            </div>
            <div className="collapse-content">
              <div className="py-5 flex flex-col gap-5">
                <div className="divider" />
                {filtredEpisode.map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    item={episode}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Season;
