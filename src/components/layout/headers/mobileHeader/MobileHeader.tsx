"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import style from "./MobileHeadet.module.scss";
import Link from "next/link";

const MobileHeader = () => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: "/anime/list", label: "Home" },
    { href: "/anime/add", label: "Adicionar" },
    { href: "/anime/lookup", label: "Scrapper" },
  ];

  return (
    <header className={style.mobileHeader}>
      <h1>Anime List Organizer</h1>
      <button type="button" onClick={() => setShowNav(true)}>
        <Image src="/icons/menu_icon.svg" alt="Menu" width={40} height={40} />
      </button>
      <aside className={showNav ? style.show : ""}>
        <button type="button" onClick={() => setShowNav(false)}>
          <Image
            src="/icons/close_icon.svg"
            alt="Close"
            width={40}
            height={40}
          />
        </button>
        <nav>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? style.active : ""}
              onClick={() => setShowNav(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
};

export default MobileHeader;
