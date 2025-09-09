"use client";

import { useEffect, useState, useMemo } from "react";
import style from "./AnimeCard.module.scss";
import { AnimeDTO } from "@/lib/dto/anime.dto";
import AnimeAPI from "@/lib/api/animeApi";
import Loader from "@/components/ui/loaders/Loader";

type AnimeCardProps = {
  searchTerm: string;
  selectedCategory: string;
  selectedGenre: string;
  isMovieSelected: string;
};

const AnimeCard = ({
  searchTerm,
  selectedCategory,
  selectedGenre,
  isMovieSelected,
}: AnimeCardProps) => {
  const [animes, setAnimes] = useState<AnimeDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnimes = async () => {
      setIsLoading(true);

      try {
        const getAnimes = await AnimeAPI.getAnime("");

        setAnimes(getAnimes);
      } catch (error) {
        console.error("Erro ao buscar animes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  const filteredAnimes = useMemo(() => {
    return animes.filter((anime) => {
      const matchesSearch =
        !searchTerm ||
        anime.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !selectedCategory || anime.category.name === selectedCategory;

      const matchesGenre =
        !selectedGenre ||
        anime.genres.some((genre) => genre.name === selectedGenre);

      const matchesType =
        !isMovieSelected ||
        (isMovieSelected === "Filme" && anime.isMovie) ||
        (isMovieSelected === "Série" && !anime.isMovie);

      return matchesSearch && matchesCategory && matchesGenre && matchesType;
    });
  }, [animes, searchTerm, selectedCategory, selectedGenre, isMovieSelected]);

  return (
    <div className={style.container}>
      {isLoading ? (
        <Loader message="Carregando animes..." />
      ) : (
        filteredAnimes.map((anime) => (
          <div key={anime.id} className={style.animeCard}>
            <h3 className={style.title}>{anime.name}</h3>
            <div className={style.info}>
              <p className={style.category}>Categoria: {anime.category.name}</p>
              <p className={style.genre}>
                Gêneros: {anime.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className={style.movie}>
                Tipo: {anime.isMovie ? "Filme" : "Série"}
              </p>
            </div>
            <p className={style.description}>{anime.synopsis}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AnimeCard;
