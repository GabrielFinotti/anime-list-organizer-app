"use client";

import SearchInput from "@/components/ui/inputs/searchInput/SearchInput";
import style from "./SearchForm.module.scss";
import { useEffect, useState } from "react";
import AnimeAPI from "@/lib/api/animeApi";
import { CategoryDTO } from "@/lib/dto/category.dto";
import { GenreDTO } from "@/lib/dto/genre.dto";
import SelectInput from "@/components/ui/inputs/select/SelectInput";

const SearchForm = () => {
  const [categoryName, setCategoryName] = useState<CategoryDTO[]>([]);
  const [genreName, setGenreName] = useState<GenreDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await AnimeAPI.getCategories();
        const genres = await AnimeAPI.getGenres();

        setCategoryName(categories);
        setGenreName(genres);
      } catch (error) {
        console.error("Erro ao buscar categorias ou gêneros:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const animes = await AnimeAPI.getAnime(searchTerm);

      console.log(animes);
    } catch (error) {
      console.error("Erro ao buscar animes:", error);
    }
  };

  return (
    <form className={style.searchForm} onSubmit={handleSubmit}>
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={style.selects}>
        <SelectInput
          name="category"
          label="Categoria"
          options={categoryName.map((cat) => ({ id: cat.id, value: cat.name }))}
        />
        <SelectInput
          name="genre"
          label="Gênero"
          options={genreName.map((gen) => ({ id: gen.id, value: gen.name }))}
        />
      </div>
    </form>
  );
};

export default SearchForm;
