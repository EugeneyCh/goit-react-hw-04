function ImageCard({ urls, alt }) {
  return (
    <div>
      <img src={urls.thumb} alt={alt} />
    </div>
  );
}
export default ImageCard;
