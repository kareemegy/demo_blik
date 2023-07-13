import Arrowicon from "../../assets/arrowDownIcon.svg";



const SelectInput = () => {
    return (
      <div className="relative">
        <select className="w-full appearance-none bg-transparent border border-gray-400 py-3 px-4 pr-8  outline-none">
          <option className="text-gray-500">Option 1</option>
          <option className="text-gray-500">Option 2</option>
          <option className="text-gray-500">Option 3</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <img src={Arrowicon} alt="arrow icon" />
        </div>
      </div>
    );
  };

  export default SelectInput;
