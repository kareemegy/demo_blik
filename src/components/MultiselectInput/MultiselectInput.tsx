import { useEffect, useRef, useState } from "react";
import SelectedItems from "../SelectedItems";
import DropDown from "../DropDown";
import FilterItems from "../FilterItems";
import AddSpeaker from "../AddSpeaker";
import SearchInput from "../SearchInput";
import Divider from "../Divider";

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
  const absoluteDevContainerRef = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        absoluteDevContainerRef.current &&
        !absoluteDevContainerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
        setSearchText("");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="relative mt-10">
        {!isVisible && <DropDown onToggleVisibility={toggleVisibility} />}
        {isVisible && (
          <div
            ref={absoluteDevContainerRef}
            className="absolute top-0 left-0 w-full px-5 text-white border border-gray-400"
          >
            <SearchInput query={searchText} onQueryChange={setSearchText} />
            <Divider space={3} />
            <div className="flex flex-col justify-between">
              <AddSpeaker />
              <Divider space={3} />
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
