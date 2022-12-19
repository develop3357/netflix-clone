import IMovieNowPlaying from "./models/IMovieNowPlaying";
import IMovieSearch from "./models/IMovieSearch";
import IMovieTopRated from "./models/IMovieTopRated";
import IMovieUpcoming from "./models/IMovieUpcoming";
import ITvAiringToday from "./models/ITvAirlingToday";
import ITvPopular from "./models/ITvPopular";
import ITvSearch from "./models/ITvSearch";
import ITvTopRated from "./models/ITvTopRated";

// https://developers.themoviedb.org/3/tv/get-top-rated-tv
// https://api.themoviedb.org/3/movie/now_playing?api_key={key}

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

function getData(category: string, subject: string) {
  return fetch(`${BASE_PATH}/${category}/${subject}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

function getSearchData(category: string, keyword: string) {
  return fetch(
    `${BASE_PATH}/search/${category}?api_key=${API_KEY}&query=${keyword}`
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

export function getMovieSearch(keyword: string): Promise<IMovieSearch> {
  return getSearchData("movie", keyword);
}

export function getTvAiringToday(): Promise<ITvAiringToday> {
  return getData("tv", "airing_today");
}

export function getTvTopRated(): Promise<ITvTopRated> {
  return getData("tv", "top_rated");
}

export function getTvPopular(): Promise<ITvPopular> {
  return getData("tv", "popular");
}

export function getTvSearch(keyword: string): Promise<ITvSearch> {
  return getSearchData("tv", keyword);
}
