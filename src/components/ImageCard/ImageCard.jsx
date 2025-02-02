import s from "./ImageCard.module.css";

function ImageCard({ item, openModal }) {
  return (
    <div className={s.galleryItem}>
      <img
        src={item.urls.small}
        alt={item.alt_description}
        onClick={() => openModal(item)}
      />
    </div>
  );
}
export default ImageCard;
