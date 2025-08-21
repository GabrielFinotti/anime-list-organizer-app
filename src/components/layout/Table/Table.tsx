"use client";

import { useEffect, useState } from "react";
import style from "./Table.module.scss";

type Row = {
  _id: string;
  name: string;
  status: string;
  category: string[];
  genre: string[];
  isMovie: boolean;
  updatedAt?: string;
};

const Table = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const res = await fetch("/api/anime");
      if (!res.ok) throw new Error("Falha ao carregar");
      const data = (await res.json()) as Row[];
      setRows(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className={style.tableWrapper}>
        <table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Estatus</td>
              <td>Categorias</td>
              <td>Gêneros</td>
              <td>É um filme</td>
              <td>Última atualização</td>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.status}</td>
                <td>{(r.category || []).join(", ")}</td>
                <td>{(r.genre || []).join(", ")}</td>
                <td>{r.isMovie ? "Sim" : "Não"}</td>
                <td>
                  {r.updatedAt
                    ? new Date(r.updatedAt).toLocaleDateString("pt-BR")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
