import style from "./SelectInput.module.scss";

type SelectInputProps = {
  name: string;
  label: string
  options: { id: string; value: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput = ({ name, options, label, ...props }: SelectInputProps) => {
  return (
    <select id={name} className={style.select} defaultValue="" {...props}>
      <option value="" disabled hidden>
        {label}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
