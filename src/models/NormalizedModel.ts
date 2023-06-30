import MovieModel from "./MovieModel";
import TvModel from "./TvModel";

export interface NormalizedModel {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  genre_ids: number[];
  poster_path: string;
}

export function normalizeMovieModel(movie: MovieModel): NormalizedModel {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    backdrop_path: movie.backdrop_path,
    genre_ids: movie.genre_ids,
    poster_path: movie.poster_path,
  };
}

export function normalizeTvModel(tv: TvModel): NormalizedModel {
  return {
    id: tv.id,
    title: tv.name,
    overview: tv.overview,
    backdrop_path: tv.backdrop_path,
    genre_ids: tv.genre_ids,
    poster_path: tv.poster_path,
  };
}
