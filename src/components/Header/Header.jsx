import { FaSearch } from "react-icons/fa";

import s from "./Header.module.css";

function Header({ searchWord }) {
  return (
    <>
      <header className={s.header}>
        <form className={s.searchForm}>
          <input
            className={s.input}
            type="text"
            value={searchWord}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">
            <FaSearch className={s.icon} size="20" />
          </button>
        </form>
      </header>
    </>
  );
}

export default Header;
