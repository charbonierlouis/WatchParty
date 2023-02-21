import {
  ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { TvShow } from '../types/TvShow';
import { getSavedTv, saveTv } from '../utils';

interface ListState {
  items?: TvShow[];
  // eslint-disable-next-line no-unused-vars
  saveTvShow?: (tvShow: TvShow) => void;
  // eslint-disable-next-line no-unused-vars
  removeTvShow?: (tvShow: TvShow) => void
}

interface ProviderProps {
  children: ReactNode;
}

export const ListContext = createContext<ListState>({});

export const useList = () => useContext(ListContext);

export function ListProvider({
  children,
}: ProviderProps) {
  const [items, setItems] = useState<TvShow[]>([]);

  const saveTvShow = useCallback((tvShow: TvShow) => {
    const res = [...items, tvShow];
    saveTv(res);
    setItems(res);
  }, [items]);

  const removeTvShow = useCallback((tvShow: TvShow) => {
    const idx = items.findIndex((e) => e.id === tvShow.id);
    if (idx !== -1) {
      const res = [...items];
      res.splice(idx, 1);
      saveTv(res);
      setItems(res);
    }
  }, [items]);

  const value: ListState = useMemo(() => ({
    items,
    saveTvShow,
    removeTvShow,
  }), [items, saveTvShow, removeTvShow]);

  useEffect(() => {
    const res = getSavedTv();
    setItems(res || []);
  }, []);

  return (
    <ListContext.Provider value={value}>
      {children}
    </ListContext.Provider>
  );
}
