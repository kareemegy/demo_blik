interface Item {
  id: number;
  name: string;
  imageUrl: string;
}
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
export default FilterItems;
