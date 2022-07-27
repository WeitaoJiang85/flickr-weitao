import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationButtons = ({ totalPages, setPage }) => {
  const handleChange = (page) => {
    setPage(page);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e) => handleChange(e.target.textContent)}
        style={{ display: "flex", justifyContent: "center" }}
        count={totalPages}
        showFirstButton
        showLastButton
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};
export default PaginationButtons;
