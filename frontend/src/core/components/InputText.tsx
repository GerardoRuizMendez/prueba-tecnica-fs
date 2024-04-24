import { useState } from "react";

export default function InputText(props: {
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  type?: string;
  feedback?: string;
  regex?: RegExp;
}) {
  const [validInput, setValidInput] = useState(true);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (props.regex?.test(value)) {
      setValidInput(true);
    } else {
      setValidInput(false);
    }

    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="flex flex-col pb-5 px-5 text-left w-full">
      <label className="pb-1">{props.label}</label>
      <input
        className="text-black rounded"
        type={props.type || "text"}
        name={props.name}
        onChange={changeHandler}
        defaultValue={props.defaultValue}
      />
      <p className={`text-red-500 ${validInput ? "hidden" : ""}`}>
        {props.feedback}
      </p>
    </div>
  );
}
