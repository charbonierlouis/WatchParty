import { TvShowDetails } from '@/app/types/TvShow';
import { getApiUrl } from '@/app/utils';
import { ReactNode, Suspense } from 'react';
import Image from 'next/image';
import Genres from '@/app/components/Genres';
import Rate from '@/app/components/Rate';
import Recomendations from '@/app/components/Recomendations';
import SaveToListButton from '@/app/components/SaveToListButton';
import Similar from '@/app/components/Similars';
import TvProviders from '@/app/components/TvProvider';
import TvListLoader from '@/app/loaders/TvListLoader';
import Banner from '@/app/components/Banner';
import Container from '@/app/components/Container';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  params: {
    id: string;
  }
}

export default async function TVLayout({
  children,
  params,
}: Props) {
  const res = await fetch(getApiUrl(`/tv/${params.id}`, false), {
    next: {
      revalidate: 60,
    },
  });
  const item: TvShowDetails = await res.json();
  return (
    <div className="flex flex-col gap-5">
      <Banner
        image={item.backdrop_path}
      >
        <>
          <div className="w-full lg:max-w-[350px] shadow-xl">
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA}${item.poster_path}`}
              alt={item.name}
              width={250}
              height={250}
              className="w-full rounded-t-xl"
              priority
            />
            {/* @ts-expect-error Server Component */}
            <TvProviders
              id={Number(params.id)}
            />
          </div>
          <div className="w-full flex flex-col h-full items-start gap-3">
            <div className="w-full flex flex-col h-full items-start gap-3 opaticy-80">
              <Genres
                items={item.genres}
              />
              <Link href={`tv/${params.id}`}>
                <h1 className="text-white text-4xl hover:underline">{item.name}</h1>
              </Link>
              <Rate
                value={item.vote_average}
                id={item.name}
              />
              <p className="text-left text-white">{item.overview}</p>
            </div>
            <SaveToListButton
              className="w-fit flex justify-center gap-2 btn-secondary"
              item={item}
              addToListText="Ajouter à ma liste"
              removeToListText="Retirer de ma liste"
            />
          </div>
        </>
      </Banner>
      <Container>

        {children}

        <div className="divider" />

        <Suspense fallback={<TvListLoader />}>
          {/* @ts-expect-error Server Component */}
          <Similar
            id={Number(params.id)}
          />
        </Suspense>

        <div className="divider" />

        <Suspense fallback={<TvListLoader />}>
          {/* @ts-expect-error Server Component */}
          <Recomendations
            id={Number(params.id)}
          />
        </Suspense>
      </Container>
    </div>
  );
}
