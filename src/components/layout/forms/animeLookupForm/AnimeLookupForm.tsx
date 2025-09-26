"use client";

import { useState, useCallback } from "react";
import AnimeForm, { AnimeFormData } from "../animeForm/AnimeForm";
import style from "./AnimeLookupForm.module.scss";
import SearchInput from "@/components/ui/inputs/searchInput/SearchInput";
import AnimeAPI from "@/lib/api/animeApi";
import { AnimeDTO } from "@/lib/dto/anime.dto";

const mapDtoToFormPartial = (dto: AnimeDTO): Partial<AnimeFormData> => {
  return {
    name: dto.name,
    synopsis: dto.synopsis,
    category: dto.category ? { name: dto.category.name } : undefined,
    genres: dto.genres?.map((g) => ({ name: g.name })) || undefined,
    adultGenres: dto.adultGenres?.map((g) => ({ name: g.name })) || undefined,
    typeOfMaterialOrigin: dto.typeOfMaterialOrigin,
    materialOriginName: dto.materialOriginName,
    releaseDate: dto.releaseDate,
    isMovie: dto.isMovie,
    isAdult: dto.isAdult,
    derivate: dto.derivate,
    lastReleaseSeason: dto.lastReleaseSeason,
    lastWatchedSeason: dto.lastWatchedSeason,
    lastWatchedEpisode: dto.lastWatchedEpisode,
    actualStatus: dto.actualStatus,
    status: dto.status,
  };
};

const AnimeLookupForm = () => {
  const [search, setSearch] = useState("");
  const [initialData, setInitialData] = useState<Partial<AnimeFormData>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = useCallback(async () => {
    if (!search.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await AnimeAPI.getAnimeLookup(search.trim());

      if (data) {
        setInitialData(mapDtoToFormPartial(data));
      }
    } catch (e) {
      setError("Erro ao buscar anime");

      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [search]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLookup();
    }
  };

  return (
    <>
      <section className={style.searchSection}>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={loading}
        />
        {loading && (
          <span style={{ color: "#999", fontSize: "0.9rem" }}>Buscando...</span>
        )}
        {error && (
          <span style={{ color: "red", fontSize: "0.9rem" }}>{error}</span>
        )}
      </section>
      <AnimeForm initialData={initialData} />
    </>
  );
};

export default AnimeLookupForm;
