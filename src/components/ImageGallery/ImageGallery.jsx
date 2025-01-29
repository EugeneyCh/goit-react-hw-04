import ImageCard from "../ImageCard/ImageCard";

function ImageGallery({ images }) {
  return (
    <>
      <ul>
        {images.map((item) => (
          <li key={item.id}>
            <ImageCard item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ImageGallery;
