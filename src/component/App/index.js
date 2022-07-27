import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "../SearchPage";
import SearchResults from "../SearchResults";
import PhotoDetail from "../PhotoDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />}>
          <Route index element={<p>Enter a search to begin.</p>} />
          <Route path="/search/:queryText" element={<SearchResults />} />
          <Route path="/search/:queryText/:photoId" element={<PhotoDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
