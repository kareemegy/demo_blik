interface ButtonProps {
  title: string;
  style: string;
  onClick?: () => void;
}
const Button = ({ title, style, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        style == "white" ? "bg-white text-black" : "bg-black text-white border border-gray-700"
      } w-full py-3 px-6 font-bold`}
    >
      {title}
    </button>
  );
};

export default Button;
