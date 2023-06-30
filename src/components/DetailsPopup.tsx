import styled from "styled-components";
import { motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { moviePopupState, popupLayoutIdState, tvPopupState } from "../atoms";
import { ReactElement } from "react";
import { NormalizedModel } from "../models/NormalizedModel";

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
`;

interface IDetailsPopupProps {
  item: NormalizedModel;
  children: ReactElement[];
}

function DetailsPopup({ item, children }: IDetailsPopupProps) {
  const movieMatch = useMatch("/movie/:id");
  const tvMatch = useMatch("/tv/:id");
  const navigate = useNavigate();
  const setMovieOnPopup = useSetRecoilState(moviePopupState);
  const setTvOnPopup = useSetRecoilState(tvPopupState);
  const popupLayoutId = useRecoilValue(popupLayoutIdState);
  const onOverlayClick = () => {
    setMovieOnPopup(undefined);
    setTvOnPopup(undefined);
    if (movieMatch || tvMatch) {
      navigate(-1);
    }
  };
  return (
    <AnimatePresence>
      <Overlay
        key="popupOverlay"
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
      />
      <PopupPannel layoutId={popupLayoutId}>
        <PopupPannelImage
          style={{
            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
              item.backdrop_path,
              "w500"
            )})`,
          }}
        >
          <h2>{item.title}</h2>
        </PopupPannelImage>
        <PopupPannelInfo>{children}</PopupPannelInfo>
      </PopupPannel>
    </AnimatePresence>
  );
}

export default DetailsPopup;
