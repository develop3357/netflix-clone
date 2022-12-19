import Dates from "./Dates";
import Result from "./Result";

interface IMovieNowPlaying {
  dates: Dates;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export default IMovieNowPlaying;
