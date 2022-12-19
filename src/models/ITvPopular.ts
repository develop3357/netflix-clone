import TvModel from "./TvModel";

export interface ITvPopular {
  page: number;
  results: TvModel[];
  total_pages: number;
  total_results: number;
}

export default ITvPopular;
