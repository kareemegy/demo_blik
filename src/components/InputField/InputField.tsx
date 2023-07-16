interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
const InputField = ({ placeholder, value, onChange,type="string" }: InputFieldProps) => {
  return (
    <div className="mb-10">
      <input
        className="w-full bg-transparent border border-gray-400  mt-2 p-3 outline-none   placeholder:text-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};
export default InputField;
