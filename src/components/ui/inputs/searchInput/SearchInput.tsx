"use client";

import { useState } from "react";
import Image from "next/image";
import style from "./SearchInput.module.scss";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchInput = (props: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`${style.searchInput} ${isFocused ? style.focused : ""}`}>
      <input
        id="search"
        type="search"
        placeholder="Buscar anime..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <span>
        <Image
          src="/icons/search_icon.svg"
          alt="Search"
          width={25}
          height={25}
        />
      </span>
    </div>
  );
};

export default SearchInput;
