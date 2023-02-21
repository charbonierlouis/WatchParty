import Link from 'next/link';
import classNames from 'classnames';
import { TvShowDetails } from '../types/TvShow';

interface Props {
  items: TvShowDetails['genres'],
  className?: string;
}

function Genres({
  items,
  className = '',
}: Props) {
  const styles = classNames(
    'flex gap-3 flex-wrap',
    className,
  );
  return (
    <div className={styles}>
      {items.map((e) => (
        <Link
          key={e.id}
          href={`/genre/${e.id}`}
          className="badge badge-outline"
        >
          {e.name}
        </Link>
      ))}
    </div>
  );
}

export default Genres;
