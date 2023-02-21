import Image from 'next/image';
import Genres from '@/app/components/Genres';
import Rate from '@/app/components/Rate';
import Recomendations from '@/app/components/Recomendations';
import SaveToListButton from '@/app/components/SaveToListButton';
import Seasons from '@/app/components/Seasons';
import Similar from '@/app/components/Similars';
import { TvShowDetails } from '@/app/types/TvShow';
import TvProviders from '@/app/components/TvProvider';
import { getApiUrl } from '@/app/utils';

interface Props {
  params: {
    id: string;
  }
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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:min-w-[250px] md:max-w-[350px]">
          <div className="w-full sticky top-5">
            <div className="w-full flex flex-col gap-5">
              <Image
                src={`${process.env.NEXT_PUBLIC_MEDIA}${item.poster_path}`}
                alt={item.name}
                width={250}
                height={250}
                className="w-full"
              />
              <SaveToListButton
                className="w-full flex justify-center gap-2"
                item={item}
                addToListText="Ajouter à ma liste"
                removeToListText="Retirer de ma liste"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl">{item.name}</h1>
          <Rate
            value={item.vote_average}
            id={item.name}
          />
          <p>{item.overview}</p>
          <Genres
            items={item.genres}
          />
          <TvProviders
            id={Number(params.id)}
          />
          <Seasons
            tvShowId={Number(params.id)}
            seasons={item.seasons}
          />
        </div>
      </div>
      <div className="divider" />
      <Similar
        id={Number(params.id)}
      />
      <div className="divider" />
      <Recomendations
        id={Number(params.id)}
      />
    </div>
  );
}

export default TvPage;
