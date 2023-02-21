import { List } from '../types/Api';
import { TvShow } from '../types/TvShow';
import { REVALIDATE, getApiUrl } from '../utils';
import TvList from './TvList';

async function Populars() {
  const res = await fetch(getApiUrl('/discover/tv?sort_by=popularity.desc&watch_region=FR&vote_count.gte=100', true), {
    next: {
      revalidate: REVALIDATE.ONE_DAY,
    },
  });

  const { results }: List<TvShow> = await res.json();

  if (!results?.length) {
    return null;
  }

  return (
    <TvList
      title="Populaires"
      items={results}
    />
  );
}

export default Populars;
