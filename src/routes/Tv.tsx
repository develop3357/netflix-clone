import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getTvAiringToday, getTvTopRated, getTvPopular } from "../api";
import { popupLayoutIdState, tvPopupState } from "../atoms";
import Banner from "../components/Banner";
import DetailsPopup from "../components/DetailsPopup";
import Slider from "../components/Slider";
import { normalizeTvModel } from "../models/NormalizedMode";
import TvModel from "../models/TvModel";
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

function Tv() {
  const navigate = useNavigate();
  const tvOnPopup = useRecoilValue(tvPopupState);
  const { data: airlingToday, isLoading: airlingTodayIsLoading } = useQuery(
    ["tvshows", "nowPlaying"],
    getTvAiringToday
  );
  const { data: topRated } = useQuery(["tvshows", "topRated"], getTvTopRated);
  const { data: popular } = useQuery(["tvshows", "popular"], getTvPopular);

  const setMovieOnPopup = useSetRecoilState(tvPopupState);
  const setPopupLayoutId = useSetRecoilState(popupLayoutIdState);
  const onSliderTvClick = (tv: TvModel, layoutId: string) => {
    setPopupLayoutId(layoutId);
    setMovieOnPopup(tv);
    navigate(`/tv/${tv.id}`);
  };

  return (
    <Wrapper>
      {airlingTodayIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Banner
          title={airlingToday?.results[0].name}
          imageUrl={makeImagePath(airlingToday?.results[0].backdrop_path || "")}
          overview={airlingToday?.results[0].overview}
        />
      )}
      <Slider
        label="Now Playing"
        data={airlingToday?.results.slice(1)}
        onClickHandler={onSliderTvClick}
      />
      <Slider
        label="Top Rated"
        data={topRated?.results}
        onClickHandler={onSliderTvClick}
      />
      <Slider
        label="Upcoming"
        data={popular?.results}
        onClickHandler={onSliderTvClick}
      />
      {tvOnPopup && (
        <DetailsPopup item={normalizeTvModel(tvOnPopup)}>
          <h4>Overview</h4>
          <span>{tvOnPopup.overview}</span>
        </DetailsPopup>
      )}
    </Wrapper>
  );
}

export default Tv;
