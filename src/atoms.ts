import { atom } from "recoil";
import MovieModel from "./models/MovieModel";
import TvModel from "./models/TvModel";

export const moviePopupState = atom<MovieModel | undefined>({
  key: "movie",
  default: undefined,
});

export const tvPopupState = atom<TvModel | undefined>({
  key: "tv",
  default: undefined,
});

export const popupLayoutIdState = atom<string | undefined>({
  key: "popupLayoutId",
  default: undefined,
});
