import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import Search from "./Search";
import Tv from "./Tv";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "tv", element: <Tv /> },
      { path: "search", element: <Search /> },
      { path: "", element: <Home /> },
      { path: "*", element: <Home /> },
    ],
  },
]);

export default router;
