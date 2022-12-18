import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
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

const Slider = styled.div`
  position: relative;
  top: -150px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-position: center;
  background-size: cover;
  transform-origin: bottom;

  &:first-child {
    transform-origin: bottom left;
  }
  &:last-child {
    transform-origin: bottom right;
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
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

  &:first-child {
    color: black;
    justify-self: stretch;
    background-color: red;
  }
`;

const rowVariants = {
  hidden: { x: window.outerWidth - 10 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth + 10 },
};

const boxVariants = {
  normal: { scale: 1 },
  hover: { scale: 1.2, transition: { delay: 0.15 } },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.15 },
  },
};

const offset = 6;

function Movie() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movie/:movieId");
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => (prev === maxIndex - 1 ? 0 : prev + 1));
    }
  };
  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
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
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * (index + 1))
                  .map((movie) => (
                    <Box
                      layoutId={"" + movie.id}
                      key={movie.id}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
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
