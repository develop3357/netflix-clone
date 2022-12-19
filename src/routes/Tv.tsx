import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getTvAiringToday, getTvTopRated, getTvPopular } from "../api";
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

function Tv() {
  const movieOnPopup = useRecoilValue(moviePopupState);
  const { data: airlingToday, isLoading: airlingTodayIsLoading } = useQuery(
    ["tvshows", "nowPlaying"],
    getTvAiringToday
  );
  const { data: topRated } = useQuery(["tvshows", "topRated"], getTvTopRated);
  const { data: popular } = useQuery(["tvshows", "popular"], getTvPopular);

  return (
    <Wrapper>
      {airlingTodayIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Banner data={airlingToday?.results[0]} />
      )}
      <Slider label="Now Playing" data={airlingToday?.results.slice(1)} />
      <Slider label="Top Rated" data={topRated?.results} />
      <Slider label="Upcoming" data={popular?.results} />
      {movieOnPopup && <DetailsPopup movie={movieOnPopup} />}
    </Wrapper>
  );
}

export default Tv;
