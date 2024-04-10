export default function InputText(props: {
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col pb-5 px-5 text-left w-full">
      <label className="pb-1">{props.label}</label>
      <input
        className="text-black rounded"
        type={props.type || "text"}
        name={props.name}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      />
    </div>
  );
}
