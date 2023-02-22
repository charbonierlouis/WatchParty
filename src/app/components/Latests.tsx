import { getLatest } from '../services';
import TvList from './TvList';

async function Latest() {
  const { results } = await getLatest();
  return (
    <TvList
      title="Nouveautés"
      items={results}
    />
  );
}

export default Latest;
