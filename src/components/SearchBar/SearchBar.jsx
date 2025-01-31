import { FaSearch } from "react-icons/fa";
import s from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(value);
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <input
          className={s.input}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">
          <FaSearch className={s.icon} size="20" />
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
