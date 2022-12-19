import MovieModel from "./MovieModel";

interface IMovieTopRated {
  page: number;
  results: MovieModel[];
  total_pages: number;
  total_results: number;
}

export default IMovieTopRated;
