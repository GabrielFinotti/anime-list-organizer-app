import Image from "next/image";
import style from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav className={style.nav}>
      <h1>Anime List Organizer</h1>
      <Image
        src={"/sun icon.svg"}
        alt="Tema claro"
        width={38}
        height={38}
      ></Image>
    </nav>
  );
};

export default Nav;
