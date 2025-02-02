import { useEffect, useRef, useState } from "react";
import * as articlesService from "./components/services/api";
import toast, { Toaster } from "react-hot-toast";
import s from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { DNA } from "react-loader-spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const firstNewImageRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const { data } = await articlesService.fetchArticles(query, page);

        if (page > 1 && data.results.length > 0) {
          firstNewImageRef.current = data.results[0].id;
        }

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

  useEffect(() => {
    if (firstNewImageRef.current && page > 1) {
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(firstNewImageRef.current);
        if (element) {
          const yOffset = -100;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [images, page]);

  const handleSetQuery = (newQuery) => {
    if (newQuery.trim() === query.trim()) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={s.flexContainer}>
      <ImageModal
        handleOverlayClick={handleOverlayClick}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        selectedImage={selectedImage}
      />
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSetQuery} query={query} />

      {isError ? (
        <ErrorMessage />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}

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

      {!isLoading && images.length > 0 && page < totalPages && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
}

export default App;
