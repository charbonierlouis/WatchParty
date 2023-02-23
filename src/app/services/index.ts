import 'server-only';
import { Session } from 'next-auth';
import { headers } from 'next/headers';
import prisma from '@/app/lib/prismadb';
import { List } from '@prisma/client';
import { List as ListItem } from '../types/Api';
import {
  Genre, SeasonDetails, TvShow, TvShowDetails,
} from '../types/TvShow';
import { REVALIDATE, fetcher, getApiUrl } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const getTopRated = (): Promise<ListItem<TvShow>> => fetcher(
  getApiUrl(
    '/discover/tv?sort_by=vote_average.desc&watch_region=FR&vote_count.gte=100',
    true,
  ),
  {
    next: {
      revalidate: REVALIDATE.ONE_DAY,
    },
  },
);

export const getLatest = (): Promise<ListItem<TvShow>> => fetcher(
  getApiUrl(
    '/discover/tv?sort_by=first_air_date.desc&watch_region=FR&vote_count.gte=50',
    true,
  ),
  {
    next: {
      revalidate: REVALIDATE.ONE_DAY,
    },
  },
);

export const getPopulars = (): Promise<ListItem<TvShow>> => fetcher(
  getApiUrl(
    '/discover/tv?sort_by=popularity.desc&watch_region=FR&vote_count.gte=100',
    true,
  ),
  {
    next: {
      revalidate: REVALIDATE.ONE_DAY,
    },
  },
);

export const getByGenre = (id: number | string): Promise<ListItem<TvShow>> => fetcher(getApiUrl(`/discover/tv?page=1&with_genres=${id}`, true), {
  next: {
    revalidate: REVALIDATE.ONE_DAY,
  },
});

export const getGenres = (): Promise<{
  genres: Genre[];
}> => fetcher(getApiUrl('/genre/tv/list', false), {
  next: {
    revalidate: REVALIDATE.ONE_DAY,
  },
});

export const getSeason = (
  tvId: number,
  seasonNumber: number,
): Promise<SeasonDetails> => fetcher(getApiUrl(`/tv/${tvId}/season/${seasonNumber}`, false), {
  next: {
    revalidate: 60,
  },
});

export const getTvById = (id: number): Promise<TvShowDetails> => fetcher(getApiUrl(`/tv/${id}`, false), {
  next: {
    revalidate: 60,
  },
});

export const getSession = async (): Promise<Session | undefined | null> => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie: headers().get('cookie') ?? '',
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
};

export const getList = async (userId?: string) => {
  let userIdCopy = userId;
  if (!userIdCopy) {
    const session = await getSession();
    userIdCopy = session?.user.id;
  }
  if (!userIdCopy) {
    throw new Error('User need to be logged');
  }
  return prisma.list.findUnique({
    where: {
      userId: userIdCopy,
    },
    include: {
      listItem: true,
    },
  });
};

export const addItemToList = async (itemId: number, userId: string) => {
  let userList: List | null = await getList(userId);
  if (!userList) {
    userList = await prisma.list.create({
      data: {
        userId,
      },
    });
  }
  if (!userList) {
    throw new Error('error occured on list creation');
  }
  return prisma.listItem.create({
    data: {
      itemId,
      listId: userList.id,
    },
  });
};

export const getItem = async (itemId: number, listId: string) => prisma.listItem.findFirst({
  where: {
    AND: [
      {
        itemId,
      },
      {
        listId,
      },
    ],
  },
});

export const removeItemToList = async (itemId: number, userId: string) => {
  const userList: List | null = await getList(userId);
  if (!userList) {
    return;
  }
  const item = await getItem(itemId, userList.id);

  if (!item) return;

  await prisma.listItem.delete({
    where: {
      id: item?.id,
    },
  });
};
