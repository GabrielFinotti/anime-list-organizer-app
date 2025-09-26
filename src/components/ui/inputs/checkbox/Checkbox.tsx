"use client";
import React from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  checked,
  onChange,
  ...rest
}) => {
  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
