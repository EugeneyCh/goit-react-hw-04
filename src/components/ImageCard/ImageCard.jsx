function ImageCard({ urls, alt_description }) {
  console.log(urls);
  return (
    <div>
      <img src={urls.thumb} alt={alt_description} />
    </div>
  );
}
export default ImageCard;
