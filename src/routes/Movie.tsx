import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getMovieNowPlaying, getMovieTopRated, getMovieUpcoming } from "../api";
import { moviePopupState } from "../atoms";
import Banner from "../components/Banner";
import DetailsPopup from "../components/DetailsPopup";
import Slider from "../components/Slider";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 30vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Movie() {
  const movieOnPopup = useRecoilValue(moviePopupState);
  const { data: nowPlaying, isLoading: nowPlayingIsLoading } = useQuery(
    ["movies", "nowPlaying"],
    getMovieNowPlaying
  );
  const { data: topRated } = useQuery(["movies", "topRated"], getMovieTopRated);
  const { data: upcoming } = useQuery(["movies", "upcoming"], getMovieUpcoming);
  return (
    <Wrapper>
      {nowPlayingIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Banner data={nowPlaying?.results[0]} />
      )}
      <Slider
        context="movie"
        label="Now Playing"
        data={nowPlaying?.results.slice(1)}
      />
      <Slider context="movie" label="Top Rated" data={topRated?.results} />
      <Slider context="movie" label="Upcoming" data={upcoming?.results} />
      {movieOnPopup && <DetailsPopup movie={movieOnPopup} />}
    </Wrapper>
  );
}

export default Movie;
