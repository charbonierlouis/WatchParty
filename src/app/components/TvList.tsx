import { TvShow } from '../types/TvShow';
import SimpleCard from './SimpleCard';

interface Props {
  title: string;
  items: TvShow[];
}

function TvList({
  title,
  items,
}: Props) {
  const filtred: TvShow[] = items?.filter((e) => !!e.overview);

  if (!title || !filtred || !filtred.length) {
    return null;
  }
  return (
    <div className="flex flex-col gap-5 w-full">
      <h2 className="text-2xl">{title}</h2>
      <div className="flex overflow-x-auto gap-5">
        {filtred.map((item, i) => (
          <div
            key={item.id}
            className="min-w-[300px]"
          >
            <SimpleCard
              key={item.id}
              item={item}
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default TvList;
