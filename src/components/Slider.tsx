import styled from "styled-components";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils";
import { IGetMoviesResult } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
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

function Slider({ data }: { data: IGetMoviesResult | undefined }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
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
  return (
    <Wrapper onClick={increaseIndex}>
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
    </Wrapper>
  );
}

export default Slider;
