import Image from 'next/image';
import { Providers } from '../types/TvShow';
import { REVALIDATE, getApiUrl } from '../utils';

interface Props {
  id: number
}

async function TvProviders({
  id,
}: Props) {
  const res = await fetch(getApiUrl(`/tv/${id}/watch/providers`, false), {
    next: {
      revalidate: REVALIDATE.ONE_DAY,
    },
  });
  const { results: providers }: {
    results: Providers
  } = await res.json();

  const localProviders = providers.FR;
  if (!localProviders?.flatrate?.length) {
    return null;
  }

  const provider = localProviders.flatrate.sort(
    (a, b) => a.display_priority - b.display_priority,
  )[0];
  return (
    <div className="group bg-gradient-to-b text-white from-primary to-primary-focus bottom-0 w-full flex gap-3 justify-center py-3 items-center text-left rounded-b-xl hover:cursor-pointer">
      <Image
        src={`${process.env.NEXT_PUBLIC_MEDIA}${provider.logo_path}`}
        alt={provider.provider_name}
        width={40}
        height={40}
        className="rounded"
      />
      <div className="flex flex-col">
        <span>Disponible en streaming</span>
        <span className="font-bold group-hover:underline">Regarder maintenant</span>
      </div>
    </div>
  );
}

export default TvProviders;
