import Label from "./components/Label";
import InputField from "./components/InputField";
import Thumbnail from "./components/Thumbnail";
import SelectInput from "./components/SelectInput";
import Divider from "./components/Divider/Divider";
import TextArea from "./components/TextArea/TextArea";
import MultiselectInput from "./components/MultiselectInput/MultiselectInput";
import Button from "./components/Button/Button";
const NewSessionsForm = () => {
  return (
    <div className="bg-black">
      <PageHeader />
      <div className="container mx-auto max-w-4xl bg-gray-800 p-10  ">
        <Label label="Session Title" />
        <InputField placeholder="Start Typing..." />
        <Label
          label="Session Subtitle"
          infoIconText="Unique info about the session, that will be displayed under the title"
        />
        <InputField placeholder="Start Typing..." />
        <Label label="Thumbnail" />
        <Thumbnail />
        <div className="mt-10 mb-10 grid grid-cols-3 gap-2">
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
        <Divider />
        <Label label="Description" />
        <TextArea />
        <Label label="Speaker" />
        <MultiselectInput userType="speaker" />
        <Label label="Moderator" />
        <MultiselectInput userType="Moderator" />
        <Label label="Venue " />
        <SelectInput />
      </div>
    </div>
  );
};
export default NewSessionsForm;

const PageHeader = () => {
  return (
    <div className="container mx-auto flex justify-between items-center py-10 px-10">
      <div>
        <p className="text-white">New Sessions </p>
      </div>
      <div className="flex gap">
        <Button title="Cancel" style="black" />
        <Button title="Next" style="white" />
      </div>
    </div>
  );
};
