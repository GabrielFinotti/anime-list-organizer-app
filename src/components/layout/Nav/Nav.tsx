"use client";

import Image from "next/image";
import style from "./Nav.module.scss";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();

  return (
    <nav className={style.nav}>
      <h1 onClick={() => router.push("/")}>Anime List Organizer</h1>
      <button onClick={() => router.push("/list")}>
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
