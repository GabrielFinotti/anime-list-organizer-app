import style from "./DefaultInput.module.scss";

type DefaultInputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DefaultInput = ({ label, value, ...props }: DefaultInputProps) => {
  const safeValue =
    value === undefined || value === null
      ? ""
      : (value as string | number | readonly string[]);

  return (
    <div className={style.inputBox}>
      <label htmlFor={props.id}>{label}</label>
      <input value={safeValue} {...props} />
    </div>
  );
};

export default DefaultInput;
