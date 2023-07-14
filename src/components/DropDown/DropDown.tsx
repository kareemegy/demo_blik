import Arrowicon from "../../assets/arrowDownIcon.svg";

interface DropDownProps {
  onToggleVisibility: () => void;
}
const DropDown = ({ onToggleVisibility }: DropDownProps) => {
  return (
    <div className="relative" onClick={onToggleVisibility}>
      <div className=" w-full appearance-none bg-transparent border border-gray-400 py-5 px-4 pr-8 ">
        <p className="text-white">Lusail Stadium</p>
      </div>

      <div className="absolute pointer-events-none  inset-y-0 right-0 flex items-center px-2 text-white ">
        <img src={Arrowicon} alt="arrow icon" />
      </div>
    </div>
  );
};
export default DropDown;
