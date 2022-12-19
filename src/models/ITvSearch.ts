import TvModel from "./TvModel";

interface ITvSearch {
  page: number;
  results: TvModel[];
  total_pages: number;
  total_results: number;
}

export default ITvSearch;
