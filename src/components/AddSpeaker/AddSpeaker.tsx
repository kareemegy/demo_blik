import AddIcon from "../../assets/add.png";

const AddSpeaker = () => {
  return (
    <div className="flex justify-between cursor-pointer">
      <p>Add new speaker</p>
      <img className="w-4 h-4" src={AddIcon} alt="add icon" />
    </div>
  );
};
export default AddSpeaker;
