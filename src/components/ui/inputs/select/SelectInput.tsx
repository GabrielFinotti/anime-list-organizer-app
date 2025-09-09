import style from "./SelectInput.module.scss";

type SelectInputProps = {
  name: string;
  label: string;
  options: { id: string; value: string; span?: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput = ({ name, options, label, ...props }: SelectInputProps) => {
  return (
    <select id={name} className={style.select} {...props}>
      <option value="" disabled hidden>
        {label}
      </option>
      <option value="">Todos</option>
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.span ? option.span : option.value}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
