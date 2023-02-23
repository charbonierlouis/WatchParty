'use client';

import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    throw new Error('Test');
  }, []);
  return null;
}
