import { useState } from "react";
import Arrowicon from "../../assets/arrowDownIcon.svg";
import AddIcon from "../../assets/add.png";
import Delete from "../../assets/delete.svg";
interface Item {
  id: number;
  name: string;
  imageUrl: string;
}


interface Item {
  id: number;
  name: string;
  imageUrl: string;
}
const MultiselectInput = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Alice Brown",
      imageUrl:
        "https://ui-avatars.com/api/?name=Alice+Brown&size=48&rounded=true",
    },
    {
      id: 2,
      name: "Bob Anderson",
      imageUrl:
        "https://ui-avatars.com/api/?name=Bob+Anderson&size=48&rounded=true",
    },
    {
      id: 3,
      name: "Charlie Carter",
      imageUrl:
        "https://ui-avatars.com/api/?name=Charlie+Carter&size=48&rounded=true",
    },
    {
      id: 4,
      name: "David Davis",
      imageUrl:
        "https://ui-avatars.com/api/?name=David+Davis&size=48&rounded=true",
    },
    {
      id: 5,
      name: "Eva Edwards",
      imageUrl:
        "https://ui-avatars.com/api/?name=Eva+Edwards&size=48&rounded=true",
    },
    {
      id: 6,
      name: "Frank Ford",
      imageUrl:
        "https://ui-avatars.com/api/?name=Frank+Ford&size=48&rounded=true",
    },
    {
      id: 7,
      name: "Grace Garcia",
      imageUrl:
        "https://ui-avatars.com/api/?name=Grace+Garcia&size=48&rounded=true",
    },
    {
      id: 8,
      name: "Henry Hernandez",
      imageUrl:
        "https://ui-avatars.com/api/?name=Henry+Hernandez&size=48&rounded=true",
    },
    {
      id: 9,
      name: "Ivy Johnson",
      imageUrl:
        "https://ui-avatars.com/api/?name=Ivy+Johnson&size=48&rounded=true",
    },
    {
      id: 10,
      name: "Jack Kim",
      imageUrl:
        "https://ui-avatars.com/api/?name=Jack+Kim&size=48&rounded=true",
    },
  ]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropDownHight = "pt-[300px]";
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSelect = (selectedItem: Item) => {
    setSelectedItems([...selectedItems, selectedItem]);
    setItems(items.filter((item) => item.id !== selectedItem.id));
    setSearchText("");
    setIsVisible(false);
  };

  return (
    <>
      <div className="relative mt-10">
        {!isVisible && <DropDown onToggleVisibility={toggleVisibility} />}
        {isVisible && (
          <div className="absolute top-0 left-0 w-full px-5 text-white border border-gray-400">
            <SearchInput query={searchText} onQueryChange={setSearchText} />
            <hr className="my-3" />
            <div className="flex flex-col justify-between">
              <AddSpeaker />
              <hr className="my-3" />
              <FilterItems
                list={items}
                onItemClick={handleSelect}
                searchTerm={searchText}
              />
            </div>
          </div>
        )}
        <SelectedItems
          className={`${isVisible ? dropDownHight : "pt-5"}`}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          items={items}
          setItems={setItems}
        />
      </div>
    </>
  );
};

export default MultiselectInput;
interface SelectedItemsProps {
  selectedItems: Item[];
  className: string;
  setSelectedItems: (items: Item[]) => void;
  setItems: (items: Item[]) => void;
  items: Item[];
}
const SelectedItems = ({
  selectedItems,
  className = "",
  setSelectedItems,
  setItems,
  items,
}: SelectedItemsProps) => {
  const handleDelete = (itemToDelete: Item) => {
    const updatedSelectedItems = selectedItems.filter(
      (item) => item.id !== itemToDelete.id
    );
    setSelectedItems(updatedSelectedItems);
    // Add the deleted item back to the list
    const updatedAvailableItems = [...items, itemToDelete];
    setItems(updatedAvailableItems);
  };
  return (
    <div className={`flex flex-col ${className}`}>
      {selectedItems.map((item) => (
        <div className="flex items-center justify-between">
          <div
            key={item.id}
            className="flex flex-1 items-center border border-gray-500 bg-gray-750  px-3 py-1 mr-5 my-1"
          >
            <img className="pr-2" src={item.imageUrl} alt="Avatar image" />
            <p className="text-white">{item.name}</p>
          </div>
          <img
            onClick={() => handleDelete(item)}
            className="w-7 h-7 cursor-pointer"
            src={Delete}
            alt="delete icon"
          />
        </div>
      ))}
    </div>
  );
};
interface DropDownProps {
  onToggleVisibility: () => void;
}
const DropDown = ({ onToggleVisibility }: DropDownProps) => {
  return (
    <div className="relative">
      <div
        onClick={onToggleVisibility}
        className=" w-full appearance-none bg-transparent border border-gray-400 py-5 px-4 pr-8 "
      >
        <p className="text-white">Lusail Stadium</p>
      </div>

      <div className="absolute pointer-events-none  inset-y-0 right-0 flex items-center px-2 text-white ">
        <img src={Arrowicon} alt="arrow icon" />
      </div>
    </div>
  );
};

interface FilterItemsProps {
  list: Item[];
  onItemClick: (item: Item) => void;
  searchTerm: string;
}
const FilterItems = ({ list, onItemClick, searchTerm }: FilterItemsProps) => {
  const filteredItems = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {filteredItems.length === 0 ? (
        <p>No matching Users found.</p>
      ) : (
        <ul className="max-h-40 overflow-y-auto">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center my-2 cursor-pointer"
              onClick={() => onItemClick(item)}
            >
              <img className="pr-5" src={item.imageUrl} alt="Avatar image" />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AddSpeaker = () => {
  return (
    <div className="flex justify-between">
      <p>Add new speaker</p>
      <img className="w-4 h-4" src={AddIcon} alt="add icon" />
    </div>
  );
};
interface SerachInputProps {
  query: string;
  onQueryChange: (query: string) => void;
}
const SearchInput = ({ query, onQueryChange }: SerachInputProps) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };
  return (
    <input
      className="bg-transparent outline-none placeholder:text-white"
      type="text"
      name="search"
      id="search"
      placeholder="Search"
      value={query}
      onChange={handleSearch}
    />
  );
};
