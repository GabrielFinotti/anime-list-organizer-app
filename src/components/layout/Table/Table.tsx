import style from "./Table.module.scss";

const Table = () => {
  return (
    <table className={style.table}>
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
      <tbody></tbody>
    </table>
  );
};

export default Table;
