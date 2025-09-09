"use client";

import { useEffect, useState } from "react";
import style from "./SearchForm.module.scss";
import SearchInput from "@/components/ui/inputs/searchInput/SearchInput";
import AnimeAPI from "@/lib/api/animeApi";
import { CategoryDTO } from "@/lib/dto/category.dto";
import { GenreDTO } from "@/lib/dto/genre.dto";
import SelectInput from "@/components/ui/inputs/select/SelectInput";

type SearchFormProps = {
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onGenreChange: (genre: string) => void;
  onIsMovieChange: (type: string) => void;
};

const SearchForm = ({
  onSearchChange,
  onCategoryChange,
  onGenreChange,
  onIsMovieChange,
}: SearchFormProps) => {
  const [categoryName, setCategoryName] = useState<CategoryDTO[]>([]);
  const [genreName, setGenreName] = useState<GenreDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isMovieSelected, setIsMovieSelected] = useState("");

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSelectedCategory(value);
    onCategoryChange(value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSelectedGenre(value);
    onGenreChange(value);
  };

  const handleIsMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setIsMovieSelected(value);
    onIsMovieChange(value);
  };

  return (
    <div className={style.searchForm}>
      <SearchInput value={searchTerm} onChange={handleSearchChange} />
      <div className={style.selects}>
        <SelectInput
          name="category"
          label="Categoria"
          options={categoryName.map((cat) => ({ id: cat.id, value: cat.name }))}
          onChange={handleCategoryChange}
          value={selectedCategory}
        />
        <SelectInput
          name="genre"
          label="Gênero"
          options={genreName.map((gen) => ({ id: gen.id, value: gen.name }))}
          onChange={handleGenreChange}
          value={selectedGenre}
        />
        <SelectInput
          name="type"
          label="Tipo"
          options={[
            { id: "0", value: "Filme" },
            { id: "1", value: "Série" },
          ]}
          onChange={handleIsMovieChange}
          value={isMovieSelected}
        />
      </div>
    </div>
  );
};

export default SearchForm;
