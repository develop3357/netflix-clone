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

const SlideButton = styled(motion.div)`
  opacity: 0.6;
  position: absolute;
  top: 80px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
  color: black;
  display: grid;
  place-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const SlideNextButton = styled(SlideButton)`
  right: 5px;
`;

const SlidePrevButton = styled(SlideButton)`
  left: 5px;
`;

const rowVariants = {
  hidden: (isDirectionNext: boolean) => ({
    x: isDirectionNext ? window.outerWidth - 5 : -window.outerWidth + 5,
  }),
  visible: { x: 0, transition: { duration: 1 } },
  exit: (isDirectionNext: boolean) => ({
    x: isDirectionNext ? -window.outerWidth + 5 : window.outerWidth - 5,
    transition: { duration: 1 },
  }),
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

const slideButtonVariants = {
  hover: {
    scale: 1.25,
    opacity: 0.9,
  },
};

const offset = 6;

function Slider({ data }: { data: IGetMoviesResult | undefined }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isSlideNext, setSlideNext] = useState(true);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  const slide = (isNext: boolean) => {
    setSlideNext(isNext);
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setIndex((prev) => {
        const totalMovies = data.results.length - 1;
        const maxIndex = Math.floor(totalMovies / offset);
        let nextIndex = 0;
        if (isNext) {
          nextIndex = prev === maxIndex - 1 ? 0 : prev + 1;
        } else {
          nextIndex = prev === 0 ? maxIndex - 1 : prev - 1;
        }
        return nextIndex;
      });
    }
  };
  const slideNext = () => slide(true);
  const slidePrev = () => slide(false);
  return (
    <Wrapper>
      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        custom={isSlideNext}
      >
        <Row
          custom={isSlideNext}
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
        <SlidePrevButton
          key="slidePrevButton"
          onClick={slidePrev}
          variants={slideButtonVariants}
          whileHover="hover"
        >
          ➡
        </SlidePrevButton>
        <SlideNextButton
          key="slideNextButton"
          onClick={slideNext}
          variants={slideButtonVariants}
          whileHover="hover"
        >
          ⬅
        </SlideNextButton>
      </AnimatePresence>
    </Wrapper>
  );
}

export default Slider;
