"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [filterName, setFilterName] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"novo" | "antigo">("novo");

  async function load() {
    try {
      const res = await fetch("/api/anime");

      if (!res.ok) throw new Error("Falha ao carregar");

      const data = (await res.json()) as Row[];

      setRows(data);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filteredRows = useMemo(() => {
    let list = rows;

    if (filterName.trim()) {
      const q = filterName.trim().toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(q));
    }

    if (statusFilter) {
      const normFilter = statusFilter.toLowerCase().trim();

      list = list.filter((r) => {
        const s = String(r.status ?? "")
          .toLowerCase()
          .trim();

        return s === normFilter;
      });
    }

    list = list.slice().sort((a, b) => {
      const ta = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const tb = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;

      return sortOrder === "novo" ? tb - ta : ta - tb;
    });

    return list;
  }, [rows, filterName, statusFilter, sortOrder]);

  return (
    <>
      <div className={style.filterGroup}>
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <select
          name="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="assistindo">Assistindo</option>
          <option value="assistido">Assistido</option>
          <option value="na fila">Na fila</option>
          <option value="dropado">Dropado</option>
        </select>
        <select
          name="atualizacao"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "novo" | "antigo")}
        >
          <option value="novo">Mais novo primeiro</option>
          <option value="antigo">Mais antigo primeiro</option>
        </select>
      </div>
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
              {filteredRows.map((r) => (
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
    </>
  );
};

export default Table;
