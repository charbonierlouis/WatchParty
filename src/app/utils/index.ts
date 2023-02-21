import { TvShow } from '../types/TvShow';

const SAVED_TOKEN = 'saved';

// eslint-disable-next-line import/prefer-default-export
/* @ts-expect-error */
export const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export const getSavedTv = (): TvShow[] | null => {
  const localValue = localStorage.getItem(SAVED_TOKEN);
  if (!localValue) {
    return null;
  }
  try {
    const value: TvShow[] = JSON.parse(localValue);
    return value;
  } catch {
    return null;
  }
};

export const saveTv = (tvShows: TvShow[]) => {
  localStorage.setItem(SAVED_TOKEN, JSON.stringify(tvShows));
};

export const getApiUrl = (
  url: string,
  withQueriesString: boolean,
) => `${process.env.API}${url}${withQueriesString ? '&' : '?'}api_key=${process.env.API_KEY}&language=fr`;
