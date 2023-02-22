import { getPopulars } from '../services';
import TvList from './TvList';

async function Populars() {
  const { results } = await getPopulars();

  return (
    <TvList
      title="Populaires"
      items={results}
    />
  );
}

export default Populars;
