import Result from "./Result";

interface IMovieTopRated {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export default IMovieTopRated;
