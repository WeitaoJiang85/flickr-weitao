import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import SearchResults from "../SearchResults";

//const FLICKR_API_KEY = process.env.REACT_APP_FLICKR_API_KEY;

const SearchPage = () => {
  let navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
    console.log(query);
  };

  const handleFetch = () => {
    const searchURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=59b72565c8aca4baadc7b72c64d2cce9&tags=${query}l&per_page=12&page=${page}&format=json&nojsoncallback=1`;
    fetch(searchURL)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        if (jsonData.stat === "ok") {
          console.log(jsonData.photos);
          const searchResult = jsonData.photos.photo.map((item) => ({
            id: item.id,
            title: item.title,
            owner: item.owner,
            secret: item.secret,
            server_id: item.server,
          }));
          console.log("Search result:", searchResult);
          setResult([...result, ...searchResult]);
          console.log("Result:", result);
        }
        setTotalPages(jsonData.photos.pages);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    } else {
      alert("This is  the last page");
    }
  };

  useEffect(handleFetch, [page]);

  return (
    <Container maxWidth="sm">
      <h1>Flickr Search</h1>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" variant="contained" onClick={handleFetch}>
            Search
          </Button>
        </Stack>
      </form>

      <SearchResults result={result} query={query} />

      {result.length > 1 ? (
        <button className="loadmore" onClick={loadMore}>
          Load More
        </button>
      ) : null}
    </Container>
  );
};

export default SearchPage;