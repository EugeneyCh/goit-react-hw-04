import s from "./LoadMoreBtn.module.css";

function LoadMoreBtn({ handleLoadMore }) {
  return (
    <div className={s.loadMoreBtn}>
      <button type="button" className={s.button} onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
}
export default LoadMoreBtn;
