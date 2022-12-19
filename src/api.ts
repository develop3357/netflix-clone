import IMovieNowPlaying from "./models/IMovieNowPlaying";
import IMovieTopRated from "./models/IMovieTopRated";
import IMovieUpcoming from "./models/IMovieUpcoming";

// https://developers.themoviedb.org/3/tv/get-top-rated-tv
// https://api.themoviedb.org/3/movie/now_playing?api_key={key}

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

function getData(category: string, subject: string) {
  return fetch(
    `${BASE_PATH}/${category}/${subject}?api_key=${API_KEY}&langueage=ko-KR`
  ).then((response) => response.json());
}

export function getMovieNowPlaying(): Promise<IMovieNowPlaying> {
  return getData("movie", "now_playing");
}

export function getMovieTopRated(): Promise<IMovieTopRated> {
  return getData("movie", "top_rated");
}

export function getMovieUpcoming(): Promise<IMovieUpcoming> {
  return getData("movie", "upcoming");
}

export function getTvAiringToday() {
  return getData("tv", "airing_today");
}

export function getTvTopRated() {
  return getData("tv", "top_rated");
}

export function getTvPopular() {
  return getData("tv", "popular");
}
