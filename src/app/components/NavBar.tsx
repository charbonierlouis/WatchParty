'use client';

import { GoEye } from 'react-icons/go';
import { FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

function NavBar() {
  const { data: session } = useSession();
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
        {session ? (
          <Link
            href="/list"
            className="btn btn-ghost hover:btn-secondary"
            aria-label="Voir ma liste"
          >
            <GoEye size={16} />
          </Link>
        ) : (
          <Link
            href="/api/auth/signin"
            className="btn btn-ghost hover:btn-secondary"
            aria-label="Voir ma liste"
          >
            <FiUser size={26} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
