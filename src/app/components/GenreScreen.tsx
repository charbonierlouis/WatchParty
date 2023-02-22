'use client';

import { useCallback, useMemo, useState } from 'react';
import { TvShow } from '../types/TvShow';
import SimpleCard from './SimpleCard';
import { fetcher } from '../utils';
import { List } from '../types/Api';

interface Props {
  title: string;
  items: TvShow[];
  totalPages: number;
  genreId: number;
}

function GenreScreen({
  title,
  items,
  totalPages,
  genreId,
}: Props) {
  const [tvShow, setTvShow] = useState<TvShow[]>(items);
  const [page, setPage] = useState<number>(1);
  const canGetNext = useMemo(() => page < totalPages, [page, totalPages]);

  const fetchNext = useCallback(async () => {
    const { results }: List<TvShow> = await fetcher(`/api/discover/tv?with_genres=${genreId}&page=${page + 1}`);
    setPage(page + 1);
    setTvShow([...tvShow, ...results]);
  }, [genreId, page, tvShow, setPage, setTvShow]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tvShow.filter((e) => !!e.overview && e.poster_path).map((e, i) => (
          <SimpleCard
            key={e.id}
            item={e}
            priority={i === 0}
          />
        ))}
      </div>
      {canGetNext && (
        <div className="w-full flex justify-center">
          <button
            type="button"
            className="btn bt-primary flex gap-2 justify-center items-center w-fit"
            onClick={fetchNext}
          >
            Voir plus
          </button>
        </div>
      )}
    </div>
  );
}

export default GenreScreen;
