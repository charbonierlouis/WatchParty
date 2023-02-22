import { getTopRated } from '../services';
import TvList from './TvList';

async function TopRated() {
  const { results } = await getTopRated();

  return (
    <TvList
      title="Meilleurs note"
      items={results}
    />
  );
}

export default TopRated;
