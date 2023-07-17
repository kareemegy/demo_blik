import Arrowicon from "../../assets/arrowDownIcon.svg";

interface SelectInputProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  option: string[];
}
const SelectInput = ({ onChange, value, option }: SelectInputProps) => {
  return (
    <div className="relative">
      <select
        onChange={onChange}
        value={value}
        className="w-full appearance-none bg-transparent border border-gray-400 py-3 px-4 pr-8  outline-none placeholder:text-white"
      >
        {option.map((item) => (
          <option defaultValue={item} key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <img src={Arrowicon} alt="arrow icon" />
      </div>
    </div>
  );
};

export default SelectInput;
