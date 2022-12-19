import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getMovieNowPlaying, getMovieTopRated, getMovieUpcoming } from "../api";
import { moviePopupState, popupLayoutIdState } from "../atoms";
import Banner from "../components/Banner";
import DetailsPopup from "../components/DetailsPopup";
import Slider from "../components/Slider";
import { normalizeMovieModel } from "../models/NormalizedMode";
import { makeImagePath } from "../utils";
import MovieModel from "../models/MovieModel";

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
  const navigate = useNavigate();
  const movieOnPopup = useRecoilValue(moviePopupState);
  const { data: nowPlaying, isLoading: nowPlayingIsLoading } = useQuery(
    ["movies", "nowPlaying"],
    getMovieNowPlaying
  );
  const { data: topRated } = useQuery(["movies", "topRated"], getMovieTopRated);
  const { data: upcoming } = useQuery(["movies", "upcoming"], getMovieUpcoming);
  const setMovieOnPopup = useSetRecoilState(moviePopupState);
  const setPopupLayoutId = useSetRecoilState(popupLayoutIdState);
  const onSliderMovieClick = (movie: MovieModel, layoutId: string) => {
    setPopupLayoutId(layoutId);
    setMovieOnPopup(movie);
    navigate(`/movie/${movie.id}`);
  };
  return (
    <Wrapper>
      {nowPlayingIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Banner
          title={nowPlaying?.results[0].title}
          imageUrl={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          overview={nowPlaying?.results[0].overview}
        />
      )}
      <Slider
        label="Now Playing"
        data={nowPlaying?.results.slice(1)}
        onClickHandler={onSliderMovieClick}
      />
      <Slider
        label="Top Rated"
        data={topRated?.results}
        onClickHandler={onSliderMovieClick}
      />
      <Slider
        label="Upcoming"
        data={upcoming?.results}
        onClickHandler={onSliderMovieClick}
      />
      {movieOnPopup && (
        <DetailsPopup item={normalizeMovieModel(movieOnPopup)}>
          <h4>Release</h4>
          <span>{movieOnPopup.release_date}</span>
          <h4>Stars</h4>
          <span>{movieOnPopup.vote_average}</span>
          <h4>Overview</h4>
          <span>{movieOnPopup.overview}</span>
        </DetailsPopup>
      )}
    </Wrapper>
  );
}

export default Movie;
