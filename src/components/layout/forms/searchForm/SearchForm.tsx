"use client";

import SearchInput from "@/components/ui/inputs/searchInput/SearchInput";
import style from "./SearchForm.module.scss";

const SearchForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={style.searchForm} onSubmit={handleSubmit}>
      <SearchInput />
    </form>
  );
};

export default SearchForm;
