import { getSeason } from '@/app/services';
import Link from 'next/link';
import { ReactNode } from 'react';
import { HiChevronLeft } from 'react-icons/hi';

interface Props {
  children: ReactNode;
  params: {
    id: string;
    number: string;
  }
}

export default async function SeasonLayout({
  children,
  params,
}: Props) {
  const season = await getSeason(Number(params.id), Number(params.number));

  return (
    <div className="flex flex-col gap-5">
      <Link href={`/tv/${params.id}/seasons`} className="flex gap-2 hover:underline">
        <HiChevronLeft size={32} />
        {season?.name && <h2 className="text-2xl">{season.name}</h2>}
      </Link>
      {children}
    </div>
  );
}
