"use client";

import { useState } from "react";
import AnimeCard from "@/components/layout/cards/animeCard/AnimeCard";
import SearchForm from "@/components/layout/forms/searchForm/SearchForm";

const AnimeListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isMovieSelected, setIsMovieSelected] = useState("");

  return (
    <>
      <section>
        <SearchForm
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onGenreChange={setSelectedGenre}
          onIsMovieChange={setIsMovieSelected}
        />
      </section>
      <section>
        <AnimeCard
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedGenre={selectedGenre}
          isMovieSelected={isMovieSelected}
        />
      </section>
    </>
  );
};

export default AnimeListPage;
