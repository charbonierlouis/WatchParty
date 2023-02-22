import { GoEye } from 'react-icons/go';
import Link from 'next/link';

function NavBar() {
  return (
    <div className="navbar bg-neutral shadow">
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl text-accent"
        >
          <span className="text-accent">
            Watch
          </span>
          <span className="text-white">
            Party
          </span>
        </Link>
      </div>
      <div className="flex-none">
        <Link
          href="/list"
          className="btn btn-ghost hover:btn-secondary"
          aria-label="Voir ma liste"
        >
          <GoEye size={16} />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
