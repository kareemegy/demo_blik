import React, { useState } from "react";
import Arrowicon from "../../assets/arrowDownIcon.svg";
import AddIcon from "../../assets/add.png";
import Avatar from "../../assets/avatar.png";
import Divider from "../Divider/Divider";
interface Item {
  id: number;
  name: string;
}

const MultiselectInput = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 2" },
    { id: 4, name: "Item 2" },
    { id: 5, name: "Item 2" },
    { id: 6, name: "Item 2" },
    { id: 7, name: "Item 2" },
    { id: 8, name: "Item 2" },
    { id: 9, name: "Item 2" },
    { id: 10, name: "Item 2" },
  ]);
  
  // img,name,title
  const [selected, setSelected] = useState<Item[]>([]);

  return (
    <div className="relative mt-10">
      <div className= "  w-full appearance-none bg-transparent border border-gray-400 py-5 px-4 pr-8 z-1">
        <p className="text-white">Lusail Stadium</p>
      </div>
      <div className=" pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white z-1">
        <img src={Arrowicon} alt="arrow icon" />
      </div>
      <div className=" absolute top-0 left-0 w-full z-10 px-5 text-white border border-gray-400">
        <input
          className="bg-transparent outline-none placeholder:text-"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
        />
        <hr className="my-3"  />
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <p>Add new speaker</p>
            <img className="w-4 h-4" src={AddIcon} alt="add icon" />
          </div>

          <hr className="my-3"  />
          <ul className="max-h-40 overflow-y-auto">
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
            <li className="flex items-center my-2 cursor-pointer">
              <img className="pr-5" src={Avatar} alt="Avatar image" />
              <p>Genny kim</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultiselectInput;
