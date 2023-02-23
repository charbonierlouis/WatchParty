'use client';

import { ReactElement, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TvShow } from '../../types/TvShow';

interface Props {
  className: string;
  text: string;
  item: TvShow;
  icon: ReactElement;
  type: 'ADD' | 'REMOVE';
}

function SaveToListButtonClient({
  className,
  text,
  item,
  icon,
  type,
}: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = useCallback(async () => {
    if (!session) return;
    if (type === 'ADD') {
      await fetch(`/api/list/${session.user.id}/${item.id}`, {
        method: 'POST',
      });
    }
    if (type === 'REMOVE') {
      await fetch(`/api/list/${session.user.id}/${item.id}`, {
        method: 'DELETE',
      });
    }
    router.refresh();
  }, [item, session, router, type]);

  return (
    <button
      className={className}
      type="button"
      onClick={handleClick}
      aria-label="Ajouter à ma liste"
    >
      {icon}
      {text}
    </button>
  );
}

export default SaveToListButtonClient;
