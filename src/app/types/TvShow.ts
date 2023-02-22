export interface Genre {
  id: number;
  name: string;
}

export interface Episode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string;
  show_id: number;
  season_number: number;
}

export interface EpisodeDetails extends Episode {
  vote_average: number;
  runtime: number;
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
  air_date: string;
  poster_path: string;
  episodes: Episode[];
  overview: string;
}

export interface SeasonDetails extends Season {
}

export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export interface TvShowDetails extends TvShow {
  genres: Genre[];
  seasons: Season[];
  backdrop_path: string;
}

export interface Providers {
  [key: string]: {
    flatrate?: {
      logo_path: string;
      provider_name: string;
      display_priority: number;
    }[];
  };
}

export interface Provider {
  display_priorities: Record<string, number>;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}
