export default function InputSelect(props: {
  label: string;
  options: string[];
  values: number[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
  name: string;
}) {
  return (
    <div className="flex flex-col pb-5 px-5 text-left w-full">
      <label className="pb-1">{props.label}</label>
      <select
        name={props.name}
        className="text-black rounded"
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      >
        {props.options.map((option, index) => (
          <option key={index} value={props.values[index]}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
