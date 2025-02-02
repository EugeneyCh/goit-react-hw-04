import { FaSearch } from "react-icons/fa";
import s from "./SearchBar.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const [previousQuery, setPreviousQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = value.trim();

    if (trimmedValue === "") {
      toast.error("Please enter a search query.");
      return;
    }

    if (trimmedValue === previousQuery) {
      toast.error("You’ve already searched for this.");
      setValue("");
      return;
    }

    onSubmit(trimmedValue);
    setPreviousQuery(trimmedValue);
    setValue("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button className={s.button} type="submit">
          <FaSearch className={s.icon} />
        </button>
        <input
          className={s.input}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default SearchBar;
