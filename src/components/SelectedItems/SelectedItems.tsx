import Delete from "../../assets/delete.svg";
interface Item {
  id: number;
  name: string;
  imageUrl: string;
}

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
export default SelectedItems;
