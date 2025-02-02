import { useEffect, useState } from "react";
import Modal from "react-modal";
import * as articlesService from "./components/services/api";
import toast from "react-hot-toast";
import s from "./App.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { DNA } from "react-loader-spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    background: "transparent",
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

Modal.setAppElement("#root"); // Для доступності

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  function openModal(image) {
    setSelectedImage(image);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedImage(null);
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={s.flexContainer}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Image Modal"
        shouldCloseOnOverlayClick={true}
        onClick={handleOverlayClick}
      >
        {selectedImage && (
          <img
            src={selectedImage.urls.regular}
            alt={selectedImage.alt_description}
            className={s.modalImage}
            onClick={closeModal}
          />
        )}
      </Modal>
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
        <button type="button" className={s.button} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
