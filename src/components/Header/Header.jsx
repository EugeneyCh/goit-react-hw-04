import { FaSearch } from "react-icons/fa";

import s from "./Header.module.css";

function Header({ searchWord }) {
  return (
    <>
      <header className={s.searchbar}>
        <form className={s.searchForm}>
          <button type="submit">
            <FaSearch className={s.icon} size="20" />
          </button>
          <input
            className={s.input}
            type="text"
            value={searchWord}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}

export default Header;
