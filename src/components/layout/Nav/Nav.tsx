import Image from "next/image";
import style from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav className={style.nav}>
      <h1>Anime List Organizer</h1>
      <button>
        <Image
          src={"/list icon.svg"}
          alt="Lista de Animes"
          width={38}
          height={38}
        ></Image>
      </button>
    </nav>
  );
};

export default Nav;
