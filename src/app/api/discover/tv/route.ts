import { getApiUrl } from '@/app/utils';
import { NextResponse } from 'next/server';

export const revalidate = 60;

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request) {
  const url = new URL(request.url);
  const res = await fetch(getApiUrl(`/discover/tv${url.search}`, true), {
    next: {
      revalidate: 60,
    },
  });
  const data = await res.json();

  return NextResponse.json({ ...data });
}
