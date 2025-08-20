"use client";

import { useEffect, useState } from "react";
import style from "./Form.module.scss";

export type FormData = {
  name: string;
  synopsis: string;
  status: string;
  category: string[];
  genre: string[];
  origin: string[];
  namesOfOrigins?: string[];
  isMovie: boolean;
  isSerieContentAnyMovie?: boolean;
  moviesNames?: string[];
  lastReleasedSeason?: number;
  lastWatchedSeason?: number;
  lastWatchedEpisode?: number;
};

const emptyForm: FormData = {
  name: "",
  synopsis: "",
  status: "",
  category: [],
  genre: [],
  origin: [],
  isMovie: false,
};

const Form = ({ initialData }: { initialData?: Partial<FormData> }) => {
  const [form, setForm] = useState<FormData>({
    ...emptyForm,
    ...(initialData || {}),
  });

  useEffect(() => {
    if (!initialData) return;

    const normalized: Partial<FormData> = {};

    if (typeof initialData.name === "string")
      normalized.name = initialData.name;
    if (typeof initialData.synopsis === "string")
      normalized.synopsis = initialData.synopsis;
    if (typeof initialData.status === "string")
      normalized.status = initialData.status;
    if (Array.isArray(initialData.category))
      normalized.category = initialData.category;
    if (Array.isArray(initialData.genre)) normalized.genre = initialData.genre;

    if (Array.isArray(initialData.origin) && initialData.origin.length > 0) {
      if (
        (initialData.origin as unknown[]).every((x) => typeof x === "string")
      ) {
        const cleanedOrigin = (initialData.origin as string[])
          .map((s) => s.trim())
          .filter((s) => s !== "");

        if (cleanedOrigin.length > 0) normalized.origin = cleanedOrigin;
      }
    }

    const maybeNames = (initialData as Record<string, unknown>)[
      "namesOfOrigins"
    ];

    if (
      Array.isArray(maybeNames) &&
      maybeNames.every((x) => typeof x === "string")
    ) {
      const cleaned = (maybeNames as string[])
        .map((s) => s.trim())
        .filter((s) => s !== "");

      if (cleaned.length > 0) {
        normalized.namesOfOrigins = cleaned;

        if (!normalized.origin || normalized.origin.length === 0) {
          normalized.origin = cleaned;
        }
      }
    }

    if (typeof initialData.isMovie === "boolean")
      normalized.isMovie = initialData.isMovie;
    if (typeof initialData.isSerieContentAnyMovie === "boolean")
      normalized.isSerieContentAnyMovie = initialData.isSerieContentAnyMovie;

    if (initialData.lastReleasedSeason !== undefined)
      normalized.lastReleasedSeason = initialData.lastReleasedSeason;
    if (Array.isArray(initialData.moviesNames))
      normalized.moviesNames = initialData.moviesNames;

    if (normalized.isMovie === true) {
      if (
        normalized.lastWatchedSeason === undefined &&
        initialData.lastWatchedSeason === undefined
      ) {
        normalized.lastWatchedSeason = 0;
      }
      if (
        normalized.lastWatchedEpisode === undefined &&
        initialData.lastWatchedEpisode === undefined
      ) {
        normalized.lastWatchedEpisode = 0;
      }
    }

    setForm((s) => ({ ...s, ...normalized } as FormData));
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const { name } = target;

    if (target instanceof HTMLInputElement && target.type === "number") {
      const v = target.value === "" ? undefined : Number(target.value);
      setForm((f) => ({ ...f, [name]: v } as unknown as FormData));
      return;
    }

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm(
        (f) =>
          ({
            ...f,
            [name]: (target as HTMLInputElement).checked,
          } as unknown as FormData)
      );
      return;
    }

    setForm((f) => ({ ...f, [name]: target.value } as unknown as FormData));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("submit", form);

    setForm({ ...emptyForm });
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Nome do Anime"
        required
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="lastWatchedSeason"
        type="number"
        placeholder="Última temporada assistida"
        value={form.lastWatchedSeason ?? ""}
        onChange={handleChange}
      />
      <input
        name="lastWatchedEpisode"
        type="number"
        placeholder="Último episódio assistido"
        value={form.lastWatchedEpisode ?? ""}
        onChange={handleChange}
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        required
      >
        <option value="" disabled hidden>
          Selecione o status
        </option>
        <option value="Assistindo">Assistindo</option>
        <option value="Assistido">Assistido</option>
        <option value="Na fila">Na fila</option>
        <option value="Dropado">Dropado</option>
      </select>
      <button type="submit">Adicionar anime</button>
    </form>
  );
};

export default Form;
