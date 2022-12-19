import { atom } from "recoil";
import MovieModel from "./models/MovieModel";

export const moviePopupState = atom<MovieModel | undefined>({
  key: "movie",
  default: undefined,
});

export const popupLayoutIdState = atom<string | undefined>({
  key: "popupLayoutId",
  default: undefined,
});
