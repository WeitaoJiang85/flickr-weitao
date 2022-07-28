import * as React from "react";
import Pagination from "@mui/material/Pagination";

import Stack from "@mui/material/Stack";

const PaginationButtons = ({ currentPage, setPage, totalPages }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, page) => {
          setPage(page);
        }}
        page={currentPage}
        style={{ display: "flex", justifyContent: "center" }}
        count={totalPages}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};
export default PaginationButtons;
