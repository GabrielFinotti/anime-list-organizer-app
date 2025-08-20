"use client";

import { useState } from "react";
import style from "./Search.module.scss";

type Result = {
  name: string;
  synopsis: string | null;
  category: string[];
  genre: string[];
  origin: string[];
  isMovie: boolean;
  isSerieContentAnyMovie?: boolean;
  namesOfOrigins?: string[];
  lastReleasedSeason?: number | null;
  moviesNames?: string[];
};

const Search = ({ onResult }: { onResult?: (data: Result) => void }) => {
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

      if (onResult) onResult(data);
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
