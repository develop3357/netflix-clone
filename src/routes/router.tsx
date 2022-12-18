import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Movie from "./Movie";
import Search from "./Search";
import Tv from "./Tv";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "tv", element: <Tv /> },
      { path: "search", element: <Search /> },
      { path: "movie", element: <Movie /> },
      { path: "", element: <Movie /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
