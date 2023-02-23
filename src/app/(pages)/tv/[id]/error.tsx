'use client';

import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(error);
  }, [error]);

  return (
    <div className="p-5">
      <div className="alert alert-error opacity-80">
        <h2>Une erreur est survenu</h2>
      </div>
    </div>
  );
}
