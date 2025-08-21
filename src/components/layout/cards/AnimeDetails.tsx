import style from "./AnimeDetails.module.scss";

type Anime = {
  _id: string;
  name: string;
  status?: string;
  synopsis?: string;
  category?: string[];
  genre?: string[];
  origin?: string[];
  namesOfOrigins?: string[];
  isMovie?: boolean;
  isSerieContentAnyMovie?: boolean;
  moviesNames?: string[];
  lastReleasedSeason?: number | null;
  lastWatchedSeason?: number | null;
  lastWatchedEpisode?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

const AnimeDetails = ({ anime }: { anime: Anime }) => {
  return (
    <div className={style.animeDetails}>
      <div className={style.mainData}>
        <div>
          <h1>{anime.name}</h1>
          <p>{anime.synopsis || "-"}</p>
        </div>
        <div>
          <p>
            Categoria(s):{" "}
            <span>{(anime.category || []).join(", ") || "-"}</span>
          </p>
          <p>
            Gênero(s): <span>{(anime.genre || []).join(", ") || "-"}</span>
          </p>
          <p>
            Estatus Atual: <span>{anime.status ?? "-"}</span>
          </p>
          <p>
            Origem: <span>{(anime.origin || []).join(", ") || "-"}</span>
          </p>
        </div>
      </div>
      <div className={style.additionalData}>
        <p>Nome da origem: {(anime.namesOfOrigins || []).join(", ") || "-"}</p>
        <p>
          É um filme: <strong>{anime.isMovie ? "Sim" : "Não"}</strong>
        </p>
        <p>
          Está série contém algum filme:{" "}
          <strong>{anime.isSerieContentAnyMovie ? "Sim" : "Não"}</strong>
        </p>
        <p>
          Nome(s) do(s) filme(s): {(anime.moviesNames || []).join(", ") || "-"}
        </p>
        <p>Última temporada lançada: {anime.lastReleasedSeason ?? "-"}</p>
        <p>Última temporada assistida: {anime.lastWatchedSeason ?? "-"}</p>
        <p>Último episódio assistido: {anime.lastWatchedEpisode ?? "-"}</p>
        <p>
          Quando foi adicionado:{" "}
          {anime.createdAt
            ? new Date(anime.createdAt).toLocaleDateString("pt-BR")
            : "-"}
        </p>
        <p>
          Data da última atualização:{" "}
          {anime.updatedAt
            ? new Date(anime.updatedAt).toLocaleDateString("pt-BR")
            : "-"}
        </p>
      </div>
    </div>
  );
};

export default AnimeDetails;
