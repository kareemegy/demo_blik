import { useEffect, useRef, useState } from "react";
import SelectedItems from "../SelectedItems";
import DropDown from "../DropDown";
import FilterItems from "../FilterItems";
import CreateUser from "../CreateUser";
import SearchInput from "../SearchInput";
import Divider from "../Divider";
import useLoadMore from "../../hooks/useLoadMore";
import useAuthenticatedFetch from "../../hooks/useAuthenticatedFetch";
interface Item {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}
interface Props {
  userType: string;
}
const MultiselectInput = ({ userType }: Props) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const absoluteDevContainerRef = useRef<HTMLDivElement>(null);
  const dropDownHight = "pt-[300px]";

  const { fetchData } = useAuthenticatedFetch();

  const getData = async (offset: number, limit: number) => {
    const res = await fetchData(
      `get-users?event_id=8&offset=${offset}&limit=${limit}`,
      "GET"
    );
    const items = res?.users.map((user) => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    }));
    return items || [];
  };
  const { data, lastItemRef, setIsSearching } = useLoadMore(getData);

  const handleLastItemRef = (
    ref: React.MutableRefObject<HTMLLIElement | null>
  ) => {
    return (node: HTMLLIElement) => {
      if (node) {
        ref.current = node;
      }
    };
  };
  const lastItemRefFn = handleLastItemRef(lastItemRef);
  useEffect(() => {
    if (data && data.length > 0) {
      setItems((prevItems) => {
        const filteredItems = data.filter((newItem) => {
          return !prevItems.some((prevItem) => prevItem.id === newItem.id);
        });
        return [...prevItems, ...filteredItems];
      });
    }
  }, [data]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        absoluteDevContainerRef.current &&
        !absoluteDevContainerRef.current.contains(event.target as Node) &&
        !document
          .querySelector(".modal-container")
          ?.contains(event.target as Node)
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
      <div className="relative mb-10">
        {!isVisible && <DropDown onToggleVisibility={toggleVisibility} />}
        {isVisible && (
          <div
            ref={absoluteDevContainerRef}
            className="absolute top-0 left-0 w-full px-5 text-white border border-gray-400"
          >
            <SearchInput
              query={searchText}
              onQueryChange={setSearchText}
              setIsUserSearching={setIsSearching}
            />
            <Divider space={3} />
            <div className="flex flex-col justify-between">
              <CreateUser userType={userType} />
              <Divider space={3} />
              <FilterItems
                list={items}
                onItemClick={handleSelect}
                searchTerm={searchText}
                lastItemRef={lastItemRefFn}
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

// const MultiselectInput = ({ userType }: Props) => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [selectedItems, setSelectedItems] = useState<Item[]>([]);
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const absoluteDevContainerRef = useRef<HTMLDivElement>(null);
//   const dropDownHight = "pt-[300px]";

//   const { fetchData } = useAuthenticatedFetch();
//   const { data, lastItemRef, handleSearch } = useLoadMore(
//     async (offset, limit, searchQuery = "") => {
//       const res = await fetchData(
//         `get-users?event_id=8&offset=${offset}&limit=${limit}&search=${searchQuery}`,
//         "GET"
//       );
//       const items = res?.users.map((user) => ({
//         id: user.id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         avatar: user.avatar,
//       }));
//       return items || [];
//     },
//     { limit: 10 }
//   );

//   const handleLastItemRef = (
//     ref: React.MutableRefObject<HTMLLIElement | null>
//   ) => {
//     return (node: HTMLLIElement) => {
//       if (node) {
//         ref.current = node;
//       }
//     };
//   };
//   const lastItemRefFn = handleLastItemRef(lastItemRef);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       setItems((prevItems) => [...prevItems, ...data]);
//     }
//   }, [data]);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       if (
//         absoluteDevContainerRef.current &&
//         !absoluteDevContainerRef.current.contains(event.target as Node) &&
//         !document
//           .querySelector(".modal-container")
//           ?.contains(event.target as Node)
//       ) {
//         setIsVisible(false);
//         setSearchText("");
//       }
//     };
//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, []);

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   const handleSelect = (selectedItem: Item) => {
//     setSelectedItems([...selectedItems, selectedItem]);
//     setItems(items.filter((item) => item.id !== selectedItem.id));
//     setSearchText("");
//     setIsVisible(false);
//   };

//   return (
//     <>
//       <div className="relative mb-10">
//         {!isVisible && <DropDown onToggleVisibility={toggleVisibility} />}
//         {isVisible && (
//           <div
//             ref={absoluteDevContainerRef}
//             className="absolute top-0 left-0 w-full px-5 text-white border border-gray-400"
//           >
//             <SearchInput query={searchText} onQueryChange={handleSearch} />
//             <Divider space={3} />
//             <div className="flex flex-col justify-between">
//               <CreateUser userType={userType} />
//               <Divider space={3} />
//               <FilterItems
//                 list={data}
//                 onItemClick={handleSelect}
//                 searchTerm={searchText}
//                 lastItemRef={lastItemRefFn}
//               />
//             </div>
//           </div>
//         )}
//         <SelectedItems
//           className={`${isVisible ? dropDownHight : "pt-5"}`}
//           selectedItems={selectedItems}
//           setSelectedItems={setSelectedItems}
//           items={items}
//           setItems={setItems}
//         />
//       </div>
//     </>
//   );
// };

export default MultiselectInput;
