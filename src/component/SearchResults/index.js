import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

const SearchResults = ({ result, query, handleSeleced }) => {
  return (
    <ImageList
      sx={{
        width: "60vw",
        height: "80vh",
        margin: "10px auto 0",
        justifyContent: "center",
      }}
    >
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">
          Search results here for {query}
        </ListSubheader>
      </ImageListItem>

      {result.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={`${`https://live.staticflickr.com/${item.server_id}/${item.id}_${item.secret}_z.jpg`}?w=200&fit=crop&auto=format`}
            srcSet={`${`https://live.staticflickr.com/${item.server_id}/${item.id}_${item.secret}_z.jpg`}?w=200&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.owner}
            actionIcon={
              <Link
                to={`/search/${query}/${item.id}`}
                onClick={() => handleSeleced(item.id)}
              >
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              </Link>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default SearchResults;
