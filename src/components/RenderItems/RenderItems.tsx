import Delete from "../../assets/delete.svg";
interface Item {
  id: number;
  name: string;
  imageUrl: string;
}
interface RenderItemsProps {
  items: Item[];
  onDeleteItem: (item: Item) => void;
  className: string;
}
const RenderItems = ({ items, onDeleteItem, className }: RenderItemsProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div className="flex flex-1 items-center border border-gray-500 bg-gray-750  px-3 py-1 mr-5 my-1">
            <img className="pr-2" src={item.imageUrl} alt="Avatar image" />
            <p className="text-white">{item.name}</p>
          </div>
          <img
            onClick={() => onDeleteItem(item)}
            className="w-7 h-7 cursor-pointer"
            src={Delete}
            alt="delete icon"
          />
        </div>
      ))}
    </div>
  );
};

export default RenderItems;
