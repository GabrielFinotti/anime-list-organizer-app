import style from "./AnimeDetails.module.scss";

const AnimeDetails = () => {
  return (
    <div className={style.animeDetails}>
      <div className={style.mainData}>
        <div>
          <h1>Anime Name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            asperiores molestiae alias tempore sit deleniti reprehenderit
            praesentium aliquam. Amet animi fuga voluptates soluta accusantium
            mollitia reiciendis error, itaque et quia magni ipsam accusamus.
            Maiores beatae iure animi et ut alias voluptates dolores debitis
            corrupti quia. Delectus at impedit saepe similique!
          </p>
        </div>
        <div>
          <p>
            Categoria(s): <span>Shounen, Shoujo</span>
          </p>
          <p>
            Gênero(s): <span>Ação, Aventura</span>
          </p>
          <p>
            Estatus Atual: <span>Na Fila</span>
          </p>
          <p>
            Origem: <span>Manga</span>
          </p>
        </div>
      </div>
      <div className={style.additionalData}>
        <p>Nome da origem: Origem Name</p>
        <p>
          É um filme: <strong>Sim</strong>
        </p>
        <p>
          Está série contém algum filme: <strong>Sim</strong>
        </p>
        <p>Nome(s) do(s) filme(s): Filme 1, Filme 2</p>
        <p>Última temporada lançada: Temporada 1</p>
        <p>Última temporada assistida: temp 1</p>
        <p>Último episódio assistido: Ep 12</p>
        <p>Quando foi adicionado: 01/01/2022</p>
        <p>Data da última atualização: 01/01/2022</p>
      </div>
    </div>
  );
};

export default AnimeDetails;
