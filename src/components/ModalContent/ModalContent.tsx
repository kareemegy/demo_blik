import Button from "../Button";
import InputField from "../InputField";
import Label from "../Label";
import ProfileUpload from "../ProfileUpload/ProfileUpload";
interface ModalContentProps {
  toggleModal: () => void;
}
const ModalContent = ({ toggleModal }: ModalContentProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-gray-800 border border-primary-600 p-8 shadow-lg z-10 w-[350px]">
        <div className=" mb-4">
          <h1 className="text-xl font-bold text-white">Add Speaker</h1>
        </div>
        <div>
          <div>
            <h1 className="text-white">Photo</h1>
          </div>
          <ProfileUpload />
        </div>
        <div>
          <Label label="First Name" />
          <InputField placeholder="John" />
          <Label label="last Name" />
          <InputField placeholder="Doe" />
          <Label label="Email" />
          <InputField placeholder="JohnDoe@gmail.com" />
        </div>
        <div className="flex justify-center gap-5">
          <Button onClick={toggleModal} title="Cancel " style="black" />
          <Button title="Add" style="white" />
        </div>
      </div>
    </div>
  );
};
export default ModalContent;
