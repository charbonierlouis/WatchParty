import { List } from '../types/Api';
import { TvShow } from '../types/TvShow';
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
