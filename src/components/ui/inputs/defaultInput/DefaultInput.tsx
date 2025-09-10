import style from "./DefaultInput.module.scss";

type DefaultInputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DefaultInput = ({ label, ...props }: DefaultInputProps) => {
  return (
    <div className={style.inputBox}>
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
    </div>
  );
};

export default DefaultInput;
