'use client';

import { useCallback, useMemo } from 'react';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { TvShow } from '../types/TvShow';
import { useList } from '../hooks/useList';

interface Props {
  className: string;
  addToListText: string;
  removeToListText: string;
  item: TvShow;
}

function SaveToListButton({
  className,
  addToListText,
  removeToListText,
  item,
}: Props) {
  const { saveTvShow, removeTvShow, items } = useList();

  const canSave: boolean = useMemo(() => !items?.find((e) => e.id === item.id), [items, item]);

  const handleClick = useCallback(() => {
    if (saveTvShow && item && canSave) {
      saveTvShow(item);
    } else if (removeTvShow && item) {
      removeTvShow(item);
    }
  }, [item, saveTvShow, canSave, removeTvShow]);

  const styles = useMemo(() => `btn btn-accent ${className}${!canSave ? ' btn-outline' : ''}`, [canSave, className]);

  if (!canSave) {
    return (
      <button
        className={styles}
        type="button"
        onClick={handleClick}
        aria-label="Supprimer de ma liste"
      >
        <GoEyeClosed size={16} />
        {removeToListText}
      </button>
    );
  }

  return (
    <button
      className={styles}
      type="button"
      onClick={handleClick}
      aria-label="Ajouter à ma liste"
    >
      <GoEye size={16} />
      {addToListText}
    </button>
  );
}

export default SaveToListButton;
