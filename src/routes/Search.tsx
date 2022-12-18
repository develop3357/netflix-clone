import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();
  const options = new URLSearchParams(location.search);
  const keyword = options.get("keyword");
  return null;
}

export default Search;
