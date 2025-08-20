"use client";

import { useState } from "react";
import style from "./Search.module.scss";
import type { FormData } from "@/components/layout/forms/Form";

type Result = {
  name: string;
  synopsis: string | null;
  category: string[];
  genre: string[];
  origin: string[];
  namesOfOrigins?: string[];
  isMovie: boolean;
  isSerieContentAnyMovie?: boolean;
  moviesNames?: string[];
  lastReleasedSeason?: number | null;
};

const Search = ({ onResult }: { onResult?: (data: Partial<FormData>) => void }) => {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!q.trim()) return setError("Digite o nome do anime.");
    setLoading(true);

    try {
      const res = await fetch("/api/anime/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: q.trim() }),
      });

      if (!res.ok) {
        const txt = await res.text();

        throw new Error(txt || "Erro ao buscar");
      }

      const data: Result = await res.json();

  if (onResult) {
        const normalized: Partial<FormData> = {
          name: data.name ?? "",
          synopsis: data.synopsis ?? "Dados não encontrados",
          category: Array.isArray(data.category) ? data.category : [],
          genre: Array.isArray(data.genre) ? data.genre : [],
          origin: Array.isArray(data.origin) ? data.origin : [],
          namesOfOrigins: Array.isArray(data.namesOfOrigins)
            ? data.namesOfOrigins.map((s) => s.trim()).filter((s) => s !== "")
            : [],
          isMovie: !!data.isMovie,
          isSerieContentAnyMovie: data.isSerieContentAnyMovie,
          ...(data.lastReleasedSeason !== undefined && data.lastReleasedSeason !== null
            ? { lastReleasedSeason: data.lastReleasedSeason }
            : {}),
          moviesNames: Array.isArray(data.moviesNames) ? data.moviesNames : [],
        };

  onResult(normalized);

  setQ("");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);

      setError(msg || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={style.search} onSubmit={handleSubmit}>
      <input
        type="search"
        required
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Nome do anime"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Buscando..." : "Buscar Anime"}
      </button>
      {error && <div role="alert">{error}</div>}
    </form>
  );
};

export default Search;
