import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

function ImageGallery({ images }) {
  return (
    <>
      <ul className={s.imageGallery}>
        {images.map(
          (item) => (
            console.log(item),
            (
              <li className={s.imageCard} key={item.id}>
                <ImageCard item={item} />
              </li>
            )
          )
        )}
      </ul>
    </>
  );
}

export default ImageGallery;
