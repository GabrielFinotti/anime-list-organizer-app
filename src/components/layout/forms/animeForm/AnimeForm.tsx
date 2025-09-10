"use client";

import { useState, useEffect, useRef } from "react";
import style from "./AnimeForm.module.scss";
import SelectInput from "@/components/ui/inputs/select/SelectInput";
import { AnimeDTO } from "@/lib/dto/anime.dto";
import DefaultInput from "@/components/ui/inputs/defaultInput/DefaultInput";
import AnimeAPI from "@/lib/api/animeApi";
import Checkbox from "@/components/ui/inputs/checkbox/Checkbox";
import DerivatesBox from "./derivates/DerivatesBox";

export type AnimeFormData = Omit<
  AnimeDTO,
  "id" | "category" | "genres" | "adultGenres"
> & {
  category: {
    name: string;
  };
  genres: { name: string }[];
  adultGenres: { name: string }[];
};

const actualStatusOptions = [
  { id: "publishing", value: "publishing", span: "Publicando" },
  { id: "completed", value: "completed", span: "Concluído" },
  { id: "cancelled", value: "cancelled", span: "Cancelado" },
  { id: "in production", value: "in production", span: "Em produção" },
];

const statusOptions = [
  { id: "watching", value: "watching", span: "Assistindo" },
  { id: "watched", value: "watched", span: "Assistido" },
  { id: "in list", value: "in list", span: "Na lista" },
  { id: "dropped", value: "dropped", span: "Dropado" },
];

const AnimeForm = ({
  initialData,
}: {
  initialData?: Partial<AnimeFormData>;
}) => {
  const defaultState: AnimeFormData = {
    name: "",
    synopsis: "",
    category: { name: "" },
    genres: [],
    adultGenres: [],
    typeOfMaterialOrigin: "",
    materialOriginName: "",
    releaseDate: "",
    isMovie: false,
    isAdult: false,
    derivate: {
      movies: [],
      ovas: [],
      specials: [],
    },
    lastReleaseSeason: 0,
    lastWatchedSeason: 0,
    lastWatchedEpisode: 0,
    actualStatus: "publishing",
    status: "in list",
  };

  const appliedRef = useRef(false);

  const [formData, setFormData] = useState<AnimeFormData>(defaultState);

  const mergeInitial = (
    base: AnimeFormData,
    partial?: Partial<AnimeFormData>
  ): AnimeFormData => {
    if (!partial) return base;

    const safe = <K extends keyof AnimeFormData>(key: K): AnimeFormData[K] => {
      const value = partial[key];
      return (value === undefined ? base[key] : value) as AnimeFormData[K];
    };

    return {
      ...base,
      name: safe("name"),
      synopsis: safe("synopsis"),
      category: partial.category
        ? { name: partial.category.name || "" }
        : base.category,
      genres: partial.genres
        ? partial.genres.map((g) => ({ name: g.name }))
        : base.genres,
      adultGenres: partial.adultGenres
        ? partial.adultGenres.map((g) => ({ name: g.name }))
        : base.adultGenres,
      typeOfMaterialOrigin: safe("typeOfMaterialOrigin"),
      materialOriginName: safe("materialOriginName"),
      releaseDate: safe("releaseDate"),
      isMovie: safe("isMovie"),
      isAdult: safe("isAdult"),
      derivate: partial.derivate
        ? {
            movies: partial.derivate.movies || [],
            ovas: partial.derivate.ovas || [],
            specials: partial.derivate.specials || [],
          }
        : base.derivate,
      lastReleaseSeason: safe("lastReleaseSeason"),
      lastWatchedSeason: safe("lastWatchedSeason"),
      lastWatchedEpisode: safe("lastWatchedEpisode"),
      actualStatus: safe("actualStatus"),
      status: safe("status"),
    };
  };

  useEffect(() => {
    if (initialData && !appliedRef.current) {
      setFormData((prev) => mergeInitial(prev, initialData));
      appliedRef.current = true;
    }
  }, [initialData]);

  const [categoryOptions, setCategoryOptions] = useState<
    { id: string; value: string; span: string }[]
  >([]);
  const [genreOptions, setGenreOptions] = useState<
    { id: string; value: string; span: string }[]
  >([]);
  const [adultGenreOptions, setAdultGenreOptions] = useState<
    { id: string; value: string; span: string }[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const categories = await AnimeAPI.getCategories();
        const genres = await AnimeAPI.getGenres();
        const adultGenres = await AnimeAPI.getAdultGenres();

        setCategoryOptions(
          categories.map((cat) => ({
            id: cat.id,
            value: cat.name,
            span: cat.name,
          }))
        );

        setGenreOptions(
          genres.map((gen) => ({
            id: gen.id,
            value: gen.name,
            span: gen.name,
          }))
        );

        setAdultGenreOptions(
          adultGenres.map((gen) => ({
            id: gen.id,
            value: gen.name,
            span: gen.name,
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar opções da API:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    let newValue: string | number | boolean =
      type === "checkbox" ? checked : value;

    if (type === "number") {
      newValue = value === "" ? 0 : Number(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  };

  const handleSelectChange = (
    name: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setFormData((prevData) => {
      if (name === "category") {
        return {
          ...prevData,
          category: { name: value },
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = (data: AnimeFormData) => {
      const stringFields = [
        data.name,
        data.synopsis,
        data.typeOfMaterialOrigin,
        data.materialOriginName,
        data.releaseDate,
      ];

      for (const s of stringFields) {
        if (typeof s === "string" && s.trim() === "") return false;
      }

      if (
        !data.category ||
        !data.category.name ||
        data.category.name.trim() === ""
      )
        return false;

      if (!data.genres || data.genres.length === 0) return false;

      return true;
    };

    if (!isFormValid(formData)) {
      return;
    }

    try {
      const createdAnime = await AnimeAPI.createAnime(formData);
      console.log("Anime created successfully:", createdAnime);
    } catch (error) {
      console.error("Error creating anime:", error);
    }
  };

  const handleMultiSelectChange = (
    name: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedValues.map((value) => ({ name: value })),
    }));
  };

  const handleDerivatesChange = (derivate: typeof formData.derivate) => {
    setFormData((prev) => ({ ...prev, derivate }));
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h1>Adicionar Anime</h1>
      <div className={style.inputs}>
        <DefaultInput
          label="Nome"
          id="name"
          type="text"
          value={formData.name}
          autoFocus
          autoComplete="name"
          onChange={handleChange}
        />
        <DefaultInput
          label="Sinopse"
          id="synopsis"
          type="text"
          value={formData.synopsis}
          onChange={handleChange}
        />
        <div className={style.categoryBox}>
          <SelectInput
            name="category"
            label="Categoria"
            options={categoryOptions}
            value={formData.category.name}
            onChange={(e) => handleSelectChange("category", e)}
          />
        </div>
        <div className={style.selectBox}>
          <SelectInput
            name="genres"
            label="Gêneros"
            options={genreOptions}
            value={formData.genres.map((g) => g.name)}
            multiple
            onChange={(e) => handleMultiSelectChange("genres", e)}
          />
          <SelectInput
            name="adultGenres"
            label="Gêneros Adultos"
            options={adultGenreOptions}
            value={formData.adultGenres.map((g) => g.name)}
            multiple
            onChange={(e) => handleMultiSelectChange("adultGenres", e)}
          />
        </div>
        <DefaultInput
          label="Tipo de Material de Origem"
          id="typeOfMaterialOrigin"
          type="text"
          value={formData.typeOfMaterialOrigin}
          onChange={handleChange}
        />
        <DefaultInput
          label="Nome do Material de Origem"
          id="materialOriginName"
          type="text"
          value={formData.materialOriginName}
          onChange={handleChange}
        />
        <DefaultInput
          label="Data de Lançamento"
          id="releaseDate"
          type="date"
          value={formData.releaseDate}
          onChange={handleChange}
        />
        <DefaultInput
          label="Última Temporada Lançada"
          id="lastReleaseSeason"
          type="number"
          value={formData.lastReleaseSeason}
          onChange={handleChange}
        />
        <DefaultInput
          label="Última Temporada Assistida"
          id="lastWatchedSeason"
          type="number"
          value={formData.lastWatchedSeason}
          onChange={handleChange}
        />
        <DefaultInput
          label="Último Episódio Assistido"
          id="lastWatchedEpisode"
          type="number"
          value={formData.lastWatchedEpisode}
          onChange={handleChange}
        />
        <div className={style.checkboxBox}>
          <Checkbox
            id="isMovie"
            label="É um Filme?"
            checked={formData.isMovie}
            onChange={handleChange}
          />
          <Checkbox
            id="isAdult"
            label="É Adulto?"
            checked={formData.isAdult}
            onChange={handleChange}
          />
        </div>
        <DerivatesBox
          value={formData.derivate || { movies: [], ovas: [], specials: [] }}
          onChange={handleDerivatesChange}
        />
        <div className={style.selectBox}>
          <SelectInput
            name="actualStatus"
            label="Estado Atual"
            options={actualStatusOptions}
            value={formData.actualStatus}
            onChange={(e) => handleSelectChange("actualStatus", e)}
          />
          <SelectInput
            name="status"
            label="Status"
            options={statusOptions}
            value={formData.status}
            onChange={(e) => handleSelectChange("status", e)}
          />
        </div>
      </div>
      <button type="submit" className={style.submitButton}>
        Adicionar
      </button>
    </form>
  );
};

export default AnimeForm;
