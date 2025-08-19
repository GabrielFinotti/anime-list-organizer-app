import style from "./Search.module.scss";

const Search = () => {
  return (
    <form className={style.search}>
      <input type="search" required />
      <button type="submit">Buscar Anime</button>
    </form>
  );
};

export default Search;
