import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import Slider from "../components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
`;

const PopupPannel = styled(motion.div)`
  border-radius: 15px;
  position: fixed;
  width: 80vw;
  height: 80vh;
  top: 10vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
const PopupPannelImage = styled(motion.div)`
  height: 50vh;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  h2 {
    padding: 30px 20px;
    font-size: 36px;
  }
`;
const PopupPannelInfo = styled(motion.div)`
  height: 30vh;
  padding: 20px;
  display: grid;
  grid-template-columns: 2fr 7fr;
  align-content: flex-start;
  gap: 15px 0;
  &:first-child {
    color: black;
    justify-self: stretch;
    background-color: red;
  }
`;

function Movie() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movie/:movieId");
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const onOverlayClick = () => {
    navigate(-1);
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => "" + movie.id === bigMovieMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider data={data} />
          <AnimatePresence>
            {bigMovieMatch && (
              <>
                <Overlay onClick={onOverlayClick} animate={{ opacity: 1 }} />
                {clickedMovie && (
                  <PopupPannel layoutId={bigMovieMatch.params.movieId}>
                    <PopupPannelImage
                      style={{
                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                          clickedMovie.backdrop_path,
                          "w500"
                        )})`,
                      }}
                    >
                      <h2>{clickedMovie.title}</h2>
                    </PopupPannelImage>
                    <PopupPannelInfo>
                      <h4>Release</h4>
                      <span>{clickedMovie.release_date}</span>
                      <h4>Stars</h4>
                      <span>{clickedMovie.vote_average}</span>
                      <h4>Overview</h4>
                      <span>{clickedMovie.overview}</span>
                    </PopupPannelInfo>
                  </PopupPannel>
                )}
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Movie;
