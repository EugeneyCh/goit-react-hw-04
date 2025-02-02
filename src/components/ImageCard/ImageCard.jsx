import s from "./ImageCard.module.css";

function ImageCard({ item }) {
  return (
    <div className={s.galleryItem}>
      <img src={item.urls.small} alt={item.alt_description} />
    </div>
  );
}
export default ImageCard;
