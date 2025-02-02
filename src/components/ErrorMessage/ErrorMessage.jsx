import s from "./ErrorMessage.module.css";

function ErrorMessage() {
  return (
    <div className={s.errorMessage}>
      <h2>Something went wrong! Try again later...</h2>
    </div>
  );
}
export default ErrorMessage;
