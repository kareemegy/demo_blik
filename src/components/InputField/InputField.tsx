const InputField = ({ placeholder }: { placeholder: string }) => {
    return (
      <div className="mb-10">
        <input
          className="w-full bg-transparent border border-gray-400  mt-2 p-3 outline-none   placeholder:text-gray-500"
          placeholder={placeholder}
          type="text"
        />
      </div>
    );
  };
export default InputField;
