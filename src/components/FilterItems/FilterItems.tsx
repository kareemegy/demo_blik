import avatrPlaceholder from "../../assets/avatar.png";
interface Item {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}
interface FilterItemsProps {
  list: Item[];
  onItemClick: (item: Item) => void;
  searchTerm: string;
  lastItemRef: (node: HTMLLIElement) => void;
}
const FilterItems = ({
  list,
  onItemClick,
  searchTerm,
  lastItemRef,
}: FilterItemsProps) => {
  const filteredItems = list.filter((item) =>
    item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {filteredItems.length === 0 ? (
        <p>No matching Users found.</p>
      ) : (
        <ul className="max-h-40 overflow-y-auto">
          {filteredItems.map((item, index) => (
            <li
              ref={index === filteredItems.length - 1 ? lastItemRef : null}
              key={item.id}
              className="flex items-center my-2 cursor-pointer"
              onClick={() => onItemClick(item)}
            >
              {item.avatar ? (
                <img
                  className="w-8 h-8 rounded-full"
                  src={item.avatar}
                  alt={item.first_name}
                />
              ) : (
                <img src={avatrPlaceholder} alt={item.first_name} />
              )}
              <p className="ml-5">{item.first_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default FilterItems;
