import { useEffect, useState } from "react";
import * as articlesService from "./components/services/api";
import toast from "react-hot-toast";
import s from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(3);

  useEffect(() => {
    if (!query) return;
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results } = await articlesService.fetchArticles(query, page);
        setImages((prev) => [...prev, ...results]);
      } catch {
        toast.error("Server is dead!");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  console.log(images);
  const handleSetQuery = (newQuery) => {
    // console.log(newQuery);
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <div className={s.flexContainer}>
      <SearchBar onSubmit={handleSetQuery} query={query} />
      <ImageGallery images={images} />
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>Something went wrong! Try again later...</h2>}
      {!isLoading && images.length > 0 && (
        <button
          type="button"
          className={s.button}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
