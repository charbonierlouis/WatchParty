import { List } from '../types/Api';
import { Genre, SeasonDetails, TvShow, TvShowDetails } from '../types/TvShow';
import { REVALIDATE, fetcher, getApiUrl } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getTopRated = (): Promise<List<TvShow>> => fetcher(getApiUrl('/discover/tv?sort_by=vote_average.desc&watch_region=FR&vote_count.gte=100', true), {
  next: {
    revalidate: REVALIDATE.ONE_DAY,
  },
});

export const getLatest = (): Promise<List<TvShow>> => fetcher(getApiUrl('/discover/tv?sort_by=first_air_date.desc&watch_region=FR&vote_count.gte=50', true), {
  next: {
    revalidate: REVALIDATE.ONE_DAY,
  },
});

export const getPopulars = (): Promise<List<TvShow>> => fetcher(getApiUrl('/discover/tv?sort_by=popularity.desc&watch_region=FR&vote_count.gte=100', true), {
  next: {
    revalidate: REVALIDATE.ONE_DAY,
  },
});

export const getByGenre = (id: number | string): Promise<List<TvShow>> => fetcher(getApiUrl(`/discover/tv?page=1&with_genres=${id}`, true), {
  next: {
    revalidate: REVALIDATE.ONE_DAY,
  },
});

export const getGenres = (): Promise<{
  genres: Genre[]
}> => fetcher(getApiUrl('/genre/tv/list', false), {
  next: {
    revalidate: REVALIDATE.ONE_DAY,
  },
});

export const getSeason = (tvId: number, seasonNumber: number): Promise<SeasonDetails> => fetcher(
  getApiUrl(`/tv/${tvId}/season/${seasonNumber}`, false),
  {
    next: {
      revalidate: 60,
    },
  },
);

export const getTvById = (id: number): Promise<TvShowDetails> => fetcher(
  getApiUrl(`/tv/${id}`, false),
  {
    next: {
      revalidate: 60,
    },
  },
);
