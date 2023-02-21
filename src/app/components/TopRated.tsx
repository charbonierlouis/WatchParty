import { List } from '../types/Api';
import { TvShow } from '../types/TvShow';
import { getApiUrl } from '../utils';
import TvList from './TvList';

async function TopRated() {
  const res = await fetch(getApiUrl('/discover/tv?sort_by=vote_average.desc&watch_region=FR&vote_count.gte=100', true), {
    next: {
      revalidate: 60,
    },
  });

  const { results }: List<TvShow> = await res.json();

  return (
    <TvList
      title="Meilleurs note"
      items={results}
    />
  );
}

export default TopRated;
