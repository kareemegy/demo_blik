import AddIcon from "../../assets/add.png";

interface CreateUserButton {
  toggleModal: () => void;
  userType: string;
}
const CreateUserButton = ({ toggleModal, userType }: CreateUserButton) => {
  return (
    <div onClick={toggleModal} className="flex justify-between cursor-pointer">
      <p>Add new {userType}</p>
      <img className="w-4 h-4" src={AddIcon} alt="add icon" />
    </div>
  );
};

export default CreateUserButton;
