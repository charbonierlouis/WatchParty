import Image from 'next/image';
import Link from 'next/link';
import { TvShow } from '../types/TvShow';

interface Props {
  item: TvShow;
  priority?: boolean;
}

function SimpleCard({
  item,
  priority,
}: Props) {
  return (
    <Link href={`/tv/${item.id}`} className="flex flex-col gap-3 w-full h-full">
      <Image
        src={`${process.env.NEXT_PUBLIC_MEDIA_SMALL}${item.poster_path}`}
        alt={item.name}
        width={250}
        height={350}
        className="w-full h-full object-cover card shadow-xl"
        priority={priority}
      />
    </Link>
  );
}

export default SimpleCard;
