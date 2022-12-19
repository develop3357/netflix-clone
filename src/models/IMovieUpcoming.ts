import Dates from "./Dates";
import Result from "./Result";

interface IMovieUpcoming {
  dates: Dates;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export default IMovieUpcoming;
