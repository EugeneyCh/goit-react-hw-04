import { useEffect, useState } from "react";
import * as articlesService from "./components/services/api";
import toast from "react-hot-toast";
import s from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { DNA } from "react-loader-spinner";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;
    // const controller = new AbortController();
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { data } = await articlesService.fetchArticles(query, page);
        // console.log(results, totPages);
        setImages((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        toast.error("Server is dead!");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = (newQuery) => {
    if (newQuery.trim() === query.trim()) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className={s.flexContainer}>
      <SearchBar onSubmit={handleSetQuery} query={query} />
      <ImageGallery images={images} />
      {isLoading && (
        <DNA
          visible={true}
          height="180"
          width="180"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      )}
      {isError && <h2>Something went wrong! Try again later...</h2>}
      {!isLoading && images.length > 0 && page < totalPages && (
        <button type="button" className={s.button} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
