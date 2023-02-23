import { getTvById } from '../services';
import SimpleCard from './SimpleCard';

interface Props {
  id: number;
  priority?: boolean;
}

export default async function ListItemCard({
  id,
  priority,
}: Props) {
  const item = await getTvById(id);
  if (!item) return null;
  return (
    <SimpleCard
      item={item}
      priority={priority}
    />
  );
}
