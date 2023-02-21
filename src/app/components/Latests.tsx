import { List } from '../types/Api';
import { TvShow } from '../types/TvShow';
import { getApiUrl } from '../utils';
import TvList from './TvList';

async function Latest() {
  const res = await fetch(getApiUrl('/discover/tv?sort_by=first_air_date.desc&watch_region=FR&vote_count.gte=50', true), {
    next: {
      revalidate: 60,
    },
  });

  const { results }: List<TvShow> = await res.json();
  return (
    <TvList
      title="Nouveautés"
      items={results}
    />
  );
}

export default Latest;
