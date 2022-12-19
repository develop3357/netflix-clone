import TvModel from "./TvModel";

interface ITvAiringToday {
  page: number;
  results: TvModel[];
  total_pages: number;
  total_results: number;
}

export default ITvAiringToday;
