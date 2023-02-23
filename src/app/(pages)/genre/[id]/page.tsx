import Container from '@/app/components/Container';
import NotFound from '@/app/components/Errors/NotFound';
import GenreScreen from '@/app/components/GenreScreen';
import { getByGenre, getGenres } from '@/app/services';
import { Genre } from '@/app/types/TvShow';
import { REVALIDATE } from '@/app/utils';

interface Props {
  params: {
    id: string;
  }
}

export const revalidate = REVALIDATE.ONE_DAY;

export async function generateStaticParams() {
  const { genres }: {
    genres: Genre[]
  } = await getGenres();

  return genres.map((genre) => ({
    id: genre.id.toString(),
  }));
}

async function GenrePage({
  params,
}: Props) {
  const { results, total_pages: totalPages } = await getByGenre(params.id);

  const listResult = await getGenres();

  const title = listResult?.genres?.find((e) => e.id === Number(params.id))?.name;

  if (!title) return <NotFound />;

  return (
    <Container>
      <GenreScreen
        items={results}
        title={title}
        totalPages={totalPages}
        genreId={Number(params.id)}
      />
    </Container>
  );
}

export default GenrePage;
