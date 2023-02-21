import { List } from '../types/Api';
import { TvShow } from '../types/TvShow';
import { getApiUrl } from '../utils';
import TvList from './TvList';

interface Props {
  id: number;
}

async function Recomendations({
  id,
}: Props) {
  const res = await fetch(getApiUrl(`/tv/${id}/recommendations`, false), {
    next: {
      revalidate: 60,
    },
  });

  const { results }: List<TvShow> = await res.json();

  return (
    <TvList
      title="Recomendations"
      items={results}
    />
  );
}

export default Recomendations;
