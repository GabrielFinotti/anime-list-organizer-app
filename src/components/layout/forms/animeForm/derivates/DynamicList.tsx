"use client";
import React, { useState } from "react";
import styles from "./DynamicList.module.scss";
import DefaultInput from "@/components/ui/inputs/defaultInput/DefaultInput";

interface DynamicListProps {
  label: string;
  placeholder?: string;
  items: string[];
  onChange: (items: string[]) => void;
  inputId: string;
}

const DynamicList: React.FC<DynamicListProps> = ({
  label,
  placeholder,
  items,
  onChange,
  inputId,
}) => {
  const [temp, setTemp] = useState("");

  const addItem = () => {
    const v = temp.trim();
    if (!v) return;
    onChange([...items, v]);
    setTemp("");
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <DefaultInput
          label={label}
          id={inputId}
          type="text"
          placeholder={placeholder}
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
        />
        <button type="button" className={styles.addButton} onClick={addItem}>
          Adicionar
        </button>
      </div>
      <div className={styles.list}>
        {items.map((item, i) => (
          <div key={i} className={styles.item}>
            <span>{item}</span>
            <button type="button" onClick={() => removeItem(i)}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicList;
