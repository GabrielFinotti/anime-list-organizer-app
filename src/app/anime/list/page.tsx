"use client";

import { useState } from "react";
import AnimeCard from "@/components/layout/cards/animeCard/AnimeCard";
import SearchForm from "@/components/layout/forms/searchForm/SearchForm";

const AnimeListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <>
      <section>
        <SearchForm
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onGenreChange={setSelectedGenre}
        />
      </section>
      <section>
        <AnimeCard
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedGenre={selectedGenre}
        />
      </section>
    </>
  );
};

export default AnimeListPage;
