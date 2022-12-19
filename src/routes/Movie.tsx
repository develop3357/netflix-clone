import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getMovieNowPlaying, getMovieTopRated, getMovieUpcoming } from "../api";
import { moviePopupState } from "../atoms";
import DetailsPopup from "../components/DetailsPopup";
import Slider from "../components/Slider";
import { makeImagePath } from "../utils";

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

const Banner = styled.div<{ bgPhoto: string }>`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 16px;
  width: 50%;
`;

function Movie() {
  const movieIdMatch = useMatch("/movie/:movieId");
  const movieOnPopup = useRecoilValue(moviePopupState);
  const { data: nowPlaying, isLoading: nowPlayingIsLoading } = useQuery(
    ["movies", "nowPlaying"],
    getMovieNowPlaying
  );
  const { data: topRated, isLoading: topRatedIsLoading } = useQuery(
    ["movies", "topRated"],
    getMovieTopRated
  );
  const { data: upcoming, isLoading: upcomingIsLoading } = useQuery(
    ["movies", "upcoming"],
    getMovieUpcoming
  );

  return (
    <Wrapper>
      {nowPlayingIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
          </Banner>
          <Slider label="Now Playing" data={nowPlaying?.results} />
          <Slider label="Top Rated" data={topRated?.results} />
          <Slider label="Upcoming" data={upcoming?.results} />
        </>
      )}
      {movieOnPopup && <DetailsPopup movie={movieOnPopup} />}
    </Wrapper>
  );
}

export default Movie;
