"use client";

import style from "./Loader.module.scss";

type LoaderProps = {
  message?: string;
};

const Loader = ({ message = "Carregando..." }: LoaderProps) => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}>
        <div className={style.spinner}></div>
      </div>
      {message && <p className={style.message}>{message}</p>}
    </div>
  );
};

export default Loader;
