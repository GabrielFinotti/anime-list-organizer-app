"use client";
import React from "react";
import styles from "./DerivatesBox.module.scss";
import DynamicList from "./DynamicList";

export interface DerivateData {
  movies: string[];
  ovas: string[];
  specials: string[];
}

interface DerivatesBoxProps {
  value: DerivateData;
  onChange: (value: DerivateData) => void;
}

const DerivatesBox: React.FC<DerivatesBoxProps> = ({ value, onChange }) => {
  const handleChange = (field: keyof DerivateData, items: string[]) => {
    onChange({ ...value, [field]: items });
  };

  return (
    <div className={styles.box}>
      <h2>Derivados</h2>
      <div className={styles.lists}>
        <DynamicList
          label="Filmes"
          inputId="movies"
          placeholder="Nome do filme..."
          items={value.movies || []}
          onChange={(items) => handleChange("movies", items)}
        />
        <DynamicList
          label="OVAs"
          inputId="ovas"
          placeholder="Nome do OVA..."
          items={value.ovas || []}
          onChange={(items) => handleChange("ovas", items)}
        />
        <DynamicList
          label="Especiais"
          inputId="specials"
          placeholder="Nome do especial..."
          items={value.specials || []}
          onChange={(items) => handleChange("specials", items)}
        />
      </div>
    </div>
  );
};

export default DerivatesBox;
