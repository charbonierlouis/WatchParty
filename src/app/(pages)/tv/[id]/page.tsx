import Image from 'next/image';
import Genres from '@/app/components/Genres';
import Rate from '@/app/components/Rate';
import Recomendations from '@/app/components/Recomendations';
import SaveToListButton from '@/app/components/SaveToListButton';
import Similar from '@/app/components/Similars';
import { TvShow, TvShowDetails } from '@/app/types/TvShow';
import TvProviders from '@/app/components/TvProvider';
import { REVALIDATE, getApiUrl } from '@/app/utils';
import {
  getByGenre, getGenres, getLatest, getPopulars, getSeason, getTopRated,
} from '@/app/services';
import { Suspense } from 'react';
import TvListLoader from '@/app/loaders/TvListLoader';
import _ from 'lodash';
import Banner from '@/app/components/Banner';
import Seasons from '@/app/components/Seasons';
import Container from '@/app/components/Container';

interface Props {
  params: {
    id: string;
  }
}

export const revalidate = REVALIDATE.ONE_DAY;

export async function generateStaticParams() {
  const { genres } = await getGenres();

  const byGenre = genres.map((genre) => getByGenre(genre.id));

  const topRated = getTopRated();
  const latest = getLatest();
  const populars = getPopulars();

  const [
    topRatedResponse,
    latestResponse,
    popularsResponse,
    ...rest
  ] = await Promise.all([topRated, latest, populars, ...byGenre]);

  const byGenreResult = _.flatMap(rest, (r) => r.results);

  const results: TvShow[] = [
    ...topRatedResponse.results,
    ...latestResponse.results,
    ...popularsResponse.results,
    ...byGenreResult,
  ];

  return results.map((show) => ({
    id: show.id.toString(),
  }));
}

async function TvPage({
  params,
}: Props) {
  const res = await fetch(getApiUrl(`/tv/${params.id}`, false), {
    next: {
      revalidate: 60,
    },
  });
  const item: TvShowDetails = await res.json();

  const seasonsRequest = item.seasons?.map((season) => getSeason(item.id, season.season_number));

  const seasons = await Promise.all(seasonsRequest);

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
              <h1 className="text-white text-4xl">{item.name}</h1>
              <Rate
                value={item.vote_average}
                id={item.name}
              />
              <p className="text-left text-white">{item.overview}</p>
            </div>
            <SaveToListButton
              className="w-fit flex justify-center gap-2 secondary"
              item={item}
              addToListText="Ajouter à ma liste"
              removeToListText="Retirer de ma liste"
            />
          </div>
        </>
      </Banner>
      <Container>
        <Seasons
          seasons={seasons}
        />

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

export default TvPage;
