import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Episode } from '../types/TvShow';
import Modal from './Modal';

interface Props {
  item: Episode
}

const DynamicModal = dynamic(() => import('./EpisodeModal'));

function EpisodeCard({
  item,
}: Props) {
  return (
    <>
      <Modal
        id={`modal-${item.id}`}
      >
        <DynamicModal
          tvId={item.show_id}
          seasonNumber={item.season_number}
          episodeNumber={item.episode_number}
        />
      </Modal>
      <label htmlFor={`modal-${item.id}`} className="w-full">
        <div
          className="block lg:hidden card w-full bg-base-100 shadow-xl w-full"
        >
          <figure>
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA}${item.still_path}`}
              alt={item.name}
              width={256}
              height={144}
              className="w-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.overview}</p>
          </div>
        </div>
        <div
          className="hidden lg:inline-flex card card-side bg-base-100 shadow-xl w-full"
        >
          <figure className="min-w-[250px]">
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA}${item.still_path}`}
              alt={item.name}
              width={250}
              height={250}
              className="h-full"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.overview}</p>
          </div>
        </div>
      </label>
    </>
  );
}

export default EpisodeCard;
