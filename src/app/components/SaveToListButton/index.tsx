import { TvShow } from '@/app/types/TvShow';
import { getItem, getList, getSession } from '@/app/services';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import Link from 'next/link';
import SaveToListButtonClient from './client';

interface Props {
  item: TvShow;
}

const addtext = 'Ajouter à ma liste';
const removetext = 'Retirer de ma list';
const addstyle = 'btn w-fit flex justify-center gap-2 btn-secondary';
const removestyle = `${addstyle} btn-outline`;
function AddIcon() {
  return <GoEye size={16} />;
}
function RemoveIcon() {
  return <GoEyeClosed size={16} />;
}

async function SaveToListButton({
  item,
}: Props) {
  const session = await getSession();
  if (!session) {
    return (
      <Link
        href="/api/auth/signin"
        className={addstyle}
      >
        <AddIcon />
        {addtext}
      </Link>
    );
  }
  let canAdd: boolean = true;
  const list = await getList(session.user.id);
  if (list && !!await getItem(item.id, list.id)) {
    canAdd = false;
  }
  return (
    <SaveToListButtonClient
      item={item}
      className={canAdd ? addstyle : removestyle}
      text={canAdd ? addtext : removetext}
      icon={canAdd ? <AddIcon /> : <RemoveIcon />}
      type={canAdd ? 'ADD' : 'REMOVE'}
    />
  );
}

export default SaveToListButton;
