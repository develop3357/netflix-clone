import TvModel from "./TvModel";

interface ITvTopRated {
  page: number;
  results: TvModel[];
  total_pages: number;
  total_results: number;
}

export default ITvTopRated;
