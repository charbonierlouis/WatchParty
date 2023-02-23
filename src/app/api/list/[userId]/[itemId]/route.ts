import { addItemToList, removeItemToList } from '@/app/services';
import { NextResponse } from 'next/server';

interface Params {
  params: {
    userId: string;
    itemId: string;
  }
}
// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request, { params }: Params) {
  const res = await addItemToList(Number(params.itemId), params.userId);
  return NextResponse.json(res);
}

export async function DELETE(request: Request, { params }: Params) {
  await removeItemToList(Number(params.itemId), params.userId);
  return NextResponse.json({});
}
