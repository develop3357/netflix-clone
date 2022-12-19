import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MovieModel from "../models/MovieModel";
import { makeImagePath } from "../utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { moviePopupState, popupLayoutIdState } from "../atoms";

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

interface IDetailsPopupProps {
  movie: MovieModel | undefined;
}

function DetailsPopup({ movie }: IDetailsPopupProps) {
  const navigate = useNavigate();
  const setMovieOnPopup = useSetRecoilState(moviePopupState);
  const popupLayoutId = useRecoilValue(popupLayoutIdState);
  const onOverlayClick = () => {
    setMovieOnPopup(undefined);
    navigate(-1);
  };
  return (
    <>
      <AnimatePresence>
        <Overlay
          key="popupOverlay"
          onClick={onOverlayClick}
          animate={{ opacity: 1 }}
        />
        {movie && (
          <PopupPannel layoutId={popupLayoutId}>
            <PopupPannelImage
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  movie.backdrop_path,
                  "w500"
                )})`,
              }}
            >
              <h2>{movie.title}</h2>
            </PopupPannelImage>
            <PopupPannelInfo>
              <h4>Release</h4>
              <span>{movie.release_date}</span>
              <h4>Stars</h4>
              <span>{movie.vote_average}</span>
              <h4>Overview</h4>
              <span>{movie.overview}</span>
            </PopupPannelInfo>
          </PopupPannel>
        )}
      </AnimatePresence>
    </>
  );
}

export default DetailsPopup;
