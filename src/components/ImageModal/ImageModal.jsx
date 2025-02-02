import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

function ImageModal({
  handleOverlayClick,
  modalIsOpen,
  closeModal,
  selectedImage,
}) {
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

  return (
    <>
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
          />
        )}
      </Modal>
    </>
  );
}
export default ImageModal;
