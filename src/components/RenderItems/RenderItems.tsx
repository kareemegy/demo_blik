import Delete from "../../assets/delete.svg";
import avatrPlaceholder from "../../assets/avatar.png";

interface Item {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}
interface RenderItemsProps {
  items: Item[];
  onDeleteItem: (item: Item) => void;
  className: string;
}
const RenderItems = ({
  items,
  onDeleteItem,
  className,
}: RenderItemsProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {items.map((item) => (
        <div key={item.id}  className="flex items-center justify-between">
          <div  className="flex flex-1 items-center border border-gray-500 bg-gray-750  px-3 py-1 mr-5 my-1">
            {item.avatar ? (
              <img
                className="mr-5 w-8 h-8 rounded-full"
                src={item.avatar}
                alt={item.first_name}
              />
            ) : (
              <img
                className="mr-5"
                src={avatrPlaceholder}
                alt={item.first_name}
              />
            )}
            <p className="text-white">{item.first_name}</p>
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
