import style from "./Form.module.scss";

type FormData = {
  name: string;
  synopsis: string;
  status: string;
  category: string[];
  genre: string[];
  origin: string[];
  isMovie: boolean;
  isSerieAndMovie: boolean;
  lastReleasedSeason?: number;
  lastReleasedEpisode?: number;
  lastWatchedSeason?: number;
  lastWatchedEpisode?: number;
  lastReleasedMovie?: string;
  lastWatchedMovie?: string;
  moviesNames?: string[];
};

const Form = () => {
  return (
    <form className={style.form}>
      <input type="text" placeholder="Nome do Anime" required />
      <input type="number" placeholder="Última temporada assistida" required />
      <input type="number" placeholder="Último episódio assistido" required />
      <select defaultValue={""} required>
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
