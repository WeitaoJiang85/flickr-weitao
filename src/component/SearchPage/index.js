import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import PaginationButtons from "../PaginationButtons";
import SearchResults from "../SearchResults";

const API_KEY = process.env.REACT_APP_API_KEY;

const SearchPage = () => {
  const params = useParams();
  let navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${params.queryText}l&per_page=8&page=${page}&format=json&nojsoncallback=1`
    )
      .then((res) => {
        return res.json();
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
          setResult(searchResult);
          setIsLoading(false);
        }
        setTotalPages(jsonData.photos.pages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.queryText, page]);

  useEffect(() => setPage(1), [params.queryText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <>
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
          <Button
            disabled={!query}
            type="submit"
            variant="contained"
            size="large"
          >
            Search
          </Button>
        </Stack>
      </form>
      {isloading ? (
        <p>Loading...</p>
      ) : (
        <ImageList
          sx={{
            width: "60vw",
            height: "80vh",
            margin: "10px auto 0",
            justifyContent: "center",
          }}
        >
          <ImageListItem
            key="Subheader"
            cols={2}
            sx={{ width: "100%", height: "80vh", margin: "10px auto 0" }}
          >
            <ListSubheader component="div">
              Search results here for {params.queryText}
            </ListSubheader>
          </ImageListItem>
          {result.map((item) => (
            <SearchResults
              key={item.id}
              id={item.id}
              title={item.title}
              owner={item.owner}
              secret={item.secret}
              server_id={item.server_id}
            />
          ))}
        </ImageList>
      )}
      <br />
      <PaginationButtons
        totalPages={totalPages}
        setPage={setPage}
        currentPage={page}
      />
    </>
  );
};

export default SearchPage;
