import AddIcon from "../../assets/add.png";

interface AddSpeakerButtonProps {
  toggleModal: () => void;
}
const AddSpeakerButton = ({ toggleModal }: AddSpeakerButtonProps) => {
  return (
    <div onClick={toggleModal} className="flex justify-between cursor-pointer">
      <p>Add new speaker</p>
      <img className="w-4 h-4" src={AddIcon} alt="add icon" />
    </div>
  );
};

export default AddSpeakerButton;
