import { getApiUrl } from '@/app/utils';
import { NextResponse } from 'next/server';

interface Params {
  params: {
    tvId: string;
    seasonNumber: string;
  }
}

export const revalidate = 60;

// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request, { params }: Params) {
  const res = await fetch(getApiUrl(`/tv/${params.tvId}/season/${params.seasonNumber}`, false), {
    next: {
      revalidate: 60,
    },
  });
  const data = await res.json();

  return NextResponse.json({ ...data });
}
