import MovieModel from "./MovieModel";

interface IMovieSearch {
  page: number;
  results: MovieModel[];
  total_pages: number;
  total_results: number;
}

export default IMovieSearch;
