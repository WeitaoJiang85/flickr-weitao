import * as React from "react";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

const SearchResults = ({ id, title, owner, secret, server_id }) => {
  return (
    <ImageListItem>
      <img
        src={`https://live.staticflickr.com/${server_id}/${id}_${secret}_z.jpg`}
        alt={title}
        loading="lazy"
      />
      <Link to={`/photo/${id}`} className="read_more">
        <ImageListItemBar
          title={title}
          subtitle={owner}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${title}`}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </Link>
    </ImageListItem>
  );
};

export default SearchResults;
