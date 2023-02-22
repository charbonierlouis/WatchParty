import Image from 'next/image';
import Link from 'next/link';
import { TvShow } from '../types/TvShow';
import SaveToListButton from './SaveToListButton';

interface Props {
  item: TvShow;
  priority?: boolean;
}

function SimpleCard({
  item,
  priority,
}: Props) {
  return (
    <div className="card w-full h-full bg-base-300 shadow-xl md:max-w-[350px]">
      <figure className="w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA}${item.poster_path}`}
          alt={item.name}
          width={250}
          height={250}
          className="w-full"
          priority={priority}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>
          {item.overview && (
          <>
            {item.overview.substring(0, 100)}
            {' '}
            ...
          </>
          )}
        </p>
        <div className="card-actions justify-between">
          <div className="tooltip" data-tip="Ajouter à ma liste">
            <SaveToListButton
              addToListText=""
              removeToListText=""
              item={item}
              className="btn-ghost"
            />
          </div>
          <Link
            href={`/tv/${item.id}`}
            className="btn btn-primary"
          >
            Voir plus
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SimpleCard;
