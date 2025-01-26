function Header() {
  return (
    <>
      <header>
        <form>
          <input
            type="text"
            // autocomplete="off"0
            // autofocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </form>
      </header>
    </>
  );
}

export default Header;
