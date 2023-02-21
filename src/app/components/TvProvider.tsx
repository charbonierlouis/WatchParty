import Image from 'next/image';
import { Providers } from '../types/TvShow';
import { getApiUrl } from '../utils';

interface Props {
  id: number
}

async function TvProviders({
  id,
}: Props) {
  const res = await fetch(getApiUrl(`/tv/${id}/watch/providers`, false), {
    next: {
      revalidate: 60,
    },
  });
  const { results: providers }: {
    results: Providers
  } = await res.json();

  const localProviders = providers.FR;
  if (!localProviders?.flatrate?.length) {
    return null;
  }
  return (
    <ul className="flex gap-2">
      {localProviders.flatrate.map((provider) => (
        <li
          key={provider.provider_name}
          className="tooltip w-fit"
          data-tip={provider.provider_name}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA}${provider.logo_path}`}
            alt={provider.provider_name}
            width={40}
            height={40}
          />
        </li>
      ))}
    </ul>
  );
}

export default TvProviders;
