import GenreScreen from '@/app/components/GenreScreen';
import { List } from '@/app/types/Api';
import { Genre, TvShow } from '@/app/types/TvShow';
import { getApiUrl } from '@/app/utils';

interface Props {
  params: {
    id: string;
  }
}

async function GenrePage({
  params,
}: Props) {
  const res = await fetch(getApiUrl(`/discover/tv?page=1&with_genres=${params.id}`, true), {
    next: {
      revalidate: 60,
    },
  });

  const resList = await fetch(getApiUrl('/genre/tv/list', false), {
    next: {
      revalidate: 60,
    },
  });

  const { results, total_pages: totalPages }: List<TvShow> = await res.json();
  const listResult: {
    genres: Genre[]
  } = await resList.json();
  const title = listResult?.genres?.find((e) => e.id === Number(params.id))?.name;

  if (!title) throw new Error('Not Found');

  return (
    <GenreScreen
      items={results}
      title={title}
      totalPages={totalPages}
      genreId={Number(params.id)}
    />
  );
}

export default GenrePage;
