import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieSearch, getTvSearch } from "../api";
import { makeImagePath } from "../utils";
import Tv from "./Tv";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { moviePopupState, popupLayoutIdState, tvPopupState } from "../atoms";
import DetailsPopup from "../components/DetailsPopup";
import {
  normalizeMovieModel,
  normalizeTvModel,
} from "../models/NormalizedMode";
import MovieModel from "../models/MovieModel";
import TvModel from "../models/TvModel";

const Wrapper = styled.div`
  background-color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 120px 20px 0;
`;

const H1 = styled.h1`
  font-size: 48px;
  margin-bottom: 40px;
`;

const H2 = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;
`;

const SearchResult = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 60px;
`;

const Item = styled(motion.div)<{ bgphoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 160px;
  background-image: url(${(props) => props.bgphoto});
  background-position: center;
  background-size: cover;
  transform-origin: bottom;
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  padding: 5px;
  bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.85);
`;

const itemVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: { delay: 0.2 },
  },
};

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const options = new URLSearchParams(location.search);
  const keyword = options.get("keyword");
  const setPopupLayoutId = useSetRecoilState(popupLayoutIdState);
  const [movieOnPopup, setMovieOnPopup] = useRecoilState(moviePopupState);
  const [tvOnPopup, setTvOnPopup] = useRecoilState(tvPopupState);
  const { data: movieSearch } = useQuery(["movies", "search", keyword], () =>
    getMovieSearch(keyword || "")
  );
  const { data: tvSearch } = useQuery(["tvShows", "search", keyword], () =>
    getTvSearch(keyword || "")
  );
  const onMovieClick = (movie: MovieModel, layoutId: string) => {
    setPopupLayoutId(layoutId);
    setMovieOnPopup(movie);
    // navigate(`/search/movie/${movie.id}`);
  };
  const onTvClick = (tv: TvModel, layoutId: string) => {
    setPopupLayoutId(layoutId);
    setTvOnPopup(tv);
    // navigate(`/search/tv/${tv.id}`);
  };
  return (
    <Wrapper>
      <H1>Search: {keyword}</H1>
      <H2>Movies</H2>
      <SearchResult>
        {movieSearch?.results.map((movie) => (
          <Item
            layoutId={"movieSearch" + movie.id}
            key={movie.id}
            bgphoto={makeImagePath(movie.backdrop_path, "w500")}
            variants={itemVariants}
            initial="initial"
            whileHover="hover"
            onClick={() => onMovieClick(movie, "movieSearch" + movie.id)}
          >
            <Title>{movie.title}</Title>
          </Item>
        ))}
      </SearchResult>
      <H2>Tvs</H2>
      <SearchResult>
        {tvSearch?.results.map((tv) => (
          <Item
            layoutId={"tvSearch" + tv.id}
            key={tv.id}
            bgphoto={makeImagePath(tv.backdrop_path, "w500")}
            variants={itemVariants}
            initial="initial"
            whileHover="hover"
            onClick={() => onTvClick(tv, "tvSearch" + tv.id)}
          >
            <Title>{tv.name}</Title>
          </Item>
        ))}
      </SearchResult>
      {movieOnPopup && (
        <DetailsPopup item={normalizeMovieModel(movieOnPopup)}>
          <h4>Overview</h4>
          <span>{movieOnPopup.overview}</span>
        </DetailsPopup>
      )}
      {tvOnPopup && (
        <DetailsPopup item={normalizeTvModel(tvOnPopup)}>
          <h4>Overview</h4>
          <span>{tvOnPopup.overview}</span>
        </DetailsPopup>
      )}
    </Wrapper>
  );
}

export default Search;
