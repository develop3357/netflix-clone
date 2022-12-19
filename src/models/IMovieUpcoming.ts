import DatesModel from "./DatesModel";
import MovieModel from "./MovieModel";

interface IMovieUpcoming {
  dates: DatesModel;
  page: number;
  results: MovieModel[];
  total_pages: number;
  total_results: number;
}

export default IMovieUpcoming;
