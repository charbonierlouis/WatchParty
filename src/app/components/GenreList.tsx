import { Genre } from '../types/TvShow';
import { REVALIDATE, getApiUrl } from '../utils';
import Genres from './Genres';

async function GenreList() {
  const res = await fetch(getApiUrl('/genre/tv/list', false), {
    next: {
      revalidate: REVALIDATE.ONE_DAY,
    },
  });

  const result: {
    genres: Genre[]
  } = await res.json();

  return (
    <Genres
      items={result.genres}
      className="justify-center"
    />
  );
}

export default GenreList;
