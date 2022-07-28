import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import SearchPage from "../SearchPage";
import SearchResults from "../SearchResults";
import PhotoDetail from "../PhotoDetail";

const App = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      <Routes>
        <Route path="/" element={<SearchPage />}>
          <Route index element={<p>Enter a search to begin.</p>} />
          <Route path="/search/:queryText" element={<SearchResults />} />
        </Route>
        <Route path="/photo/:photoId" element={<PhotoDetail />} />
      </Routes>
    </Container>
  );
};

export default App;
