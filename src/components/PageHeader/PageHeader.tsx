import Button from "../Button/Button";

interface Props {
  sendForm: () => void;
}
const PageHeader = ({ sendForm }: Props) => {
  return (
    <div className="container mx-auto flex justify-between items-center py-10 px-10">
      <div className="pr-3">
        <p className="text-white">New Sessions </p>
      </div>
      <div className="flex gap">
        <Button title="Cancel" style="black" />
        <Button onClick={sendForm} title="Next" style="white" />
      </div>
    </div>
  );
};

export default PageHeader;
