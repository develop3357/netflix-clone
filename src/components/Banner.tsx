import styled from "styled-components";
import MovieModel from "../models/MovieModel";
import { makeImagePath } from "../utils";

const Wrapper = styled.div<{ bgPhoto: string }>`
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

interface IBannerProps {
  data: MovieModel | undefined;
}

function Banner({ data }: IBannerProps) {
  return (
    <Wrapper bgPhoto={makeImagePath(data?.backdrop_path || "")}>
      <Title>{data?.title}</Title>
      <Overview>{data?.overview}</Overview>
    </Wrapper>
  );
}

export default Banner;
