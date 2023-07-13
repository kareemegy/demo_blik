import Label from "./components/Label";
import InputField from "./components/InputField";
import Thumbnail from "./components/Thumbnail";
import SelectInput from "./components/SelectInput";
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
      <div className="mt-10 grid grid-cols-3 gap-2">
        <div>
          <Label label="Date" />
          <SelectInput />
        </div>
        <div>
          <Label label="From" />
          <SelectInput />
        </div>
        <div>
          <Label label="till" />
          <SelectInput />
        </div>
      </div>
    </div>
  );
};
export default NewSessionsForm;
