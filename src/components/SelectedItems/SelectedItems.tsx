import RenderItems from "../RenderItems";
interface Item {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
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
    <RenderItems
      items={selectedItems}
      onDeleteItem={handleDelete}
      className={className}
    />
  );
};
export default SelectedItems;
