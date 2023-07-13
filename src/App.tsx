import Label from "./components/Label";
import InputField from "./components/InputField";
import Thumbnail from "./components/Thumbnail";

const NewSessionsForm = () => {
  return (
    <div className="container mx-auto bg-gray-800 p-10 mt-10">
      <Label label="Session Title" />
      <InputField placeholder="Start Typing..." />
      <Label
        label="Session Subtitle"
        infoIconText="Unique info about the session, that will be displayed under the title"
      />
      <InputField placeholder="Start Typing..." />
      <Label label="Thumbnail" />
      <Thumbnail />
    </div>
  );
};
export default NewSessionsForm;
