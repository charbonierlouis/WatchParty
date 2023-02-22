import { Episode } from '../types/TvShow';
import EpisodeCard from './EpisodeCard';

interface Props {
  episodes: Episode[];
}

function SeasonContent({
  episodes,
}: Props) {
  return (
    <div className="py-5 flex flex-col gap-5">
      <div className="divider" />
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.id}
          item={episode}
        />
      ))}
    </div>
  );
}

export default SeasonContent;
