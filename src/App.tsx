import Label from "./components/Label";
import InputField from "./components/InputField";
import Thumbnail from "./components/Thumbnail";
import SelectInput from "./components/SelectInput";
import Divider from "./components/Divider/Divider";
import TextArea from "./components/TextArea/TextArea";
import MultiselectInput from "./components/MultiselectInput/MultiselectInput";
import { useState } from "react";
import PageHeader from "./components/PageHeader/PageHeader";
import useAuthenticatedFetch from "./hooks/useAuthenticatedFetch";
const NewSessionsForm = () => {
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [isRestImg, setIsRestImg] = useState<boolean>(false);
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [till, setTill] = useState("");
  const [description, setDescription] = useState("");
  const [speakersID, setSpeakersID] = useState<number[]>([]);
  const [moderatorID, setModeratorID] = useState<number[]>([]);
  const [restUsers, setRestUsers] = useState<number[]>([]);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const event_id = 8;
  const { postData } = useAuthenticatedFetch();

  const handleCreateNewSession = () => {
    console.log(speakersID, moderatorID);

    const formError = validateForm();
    if (formError) {
      setFormError(formError);
      return;
    }
    (async () => {
      setIsRestImg(false);
      const data = {
        title: title,
        subtitle: subtitle,
        image: photoUrl,
        date: date,
        from: from,
        till: till,
        description: description,
        speaker_ids: speakersID,
        moderator_ids: moderatorID,
        event_id: event_id,
      };
      await postData("create-sessions", data);
      handleReset();
      setFormError("Session created successfully");
      console.log(data);
    })().catch((error) => console.log(error));
  };
  const handleReset = () => {
    setTitle("");
    setSubtitle("");
    setPhotoUrl(undefined);
    setDate("");
    setFrom("");
    setTill("");
    setDescription("");
    setIsRestImg(true);
    setSpeakersID([]);
    setModeratorID([]);
    setRestUsers([]);
  };
  const validateForm = () => {
    const text = /^[a-zA-Z]+$/;
    if (
      title === "" ||
      subtitle === "" ||
      date === "" ||
      from === "" ||
      till === "" ||
      description === ""
    ) {
      return "Please fill all the fields";
    }
    if (!text.test(title)) {
      return "Title should contain only letters";
    }
    if (photoUrl === undefined) {
      return "Please select a thumbnail";
    }
    if (!text.test(subtitle)) {
      return "Subtitle should contain only letters";
    }
    if (speakersID.length === 0) {
      return "Please select at least one speaker";
    }
    if (moderatorID.length === 0) {
      return "Please select at least one moderator";
    }
    if (photoUrl === undefined) {
      return "Please select a thumbnail";
    }

    return "";
  };

  const handlePhotoChange = (imageUrl: string | undefined) => {
    setPhotoUrl(imageUrl);
  };
  return (
    <div className="bg-black">
      <PageHeader sendForm={handleCreateNewSession} />
      <div className="container mx-auto max-w-4xl bg-gray-800 p-10  ">
        {formError && <p className="text-error-300">{formError}</p>}
        <Label label="Session Title" />
        <InputField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Start Typing..."
        />
        <Label
          label="Session Subtitle"
          infoIconText="Unique info about the session, that will be displayed under the title"
        />
        <InputField
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Start Typing..."
        />
        <Label label="Thumbnail" />
        <Thumbnail onChange={handlePhotoChange} restImg={isRestImg} />
        <div className="mt-10 mb-10 grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <Label label="Date" />
            <SelectInput
              onChange={(e) => setDate(e.target.value)}
              value={date}
              option={["2023-06-21", "2023-08-25", "2023-09-24", "2023-10-24"]}
            />
          </div>
          <div>
            <Label label="From" />
            <SelectInput
              onChange={(e) => setFrom(e.target.value)}
              value={from}
              option={["10:00", "11:00", "12:00", "13:00", "14:00"]}
            />
          </div>
          <div>
            <Label label="till" />
            <SelectInput
              onChange={(e) => setTill(e.target.value)}
              value={till}
              option={["10:00", "11:00", "12:00", "13:00", "14:00"]}
            />
          </div>
        </div>
        <Divider />
        <Label label="Description" />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label label="Speaker" />
        <MultiselectInput
          userType="speaker"
          restUsers={restUsers}
          getIds={setSpeakersID}
        />
        <Label label="Moderator" />
        <MultiselectInput
          userType="Moderator"
          restUsers={restUsers}
          getIds={setModeratorID}
        />
      </div>
    </div>
  );
};
export default NewSessionsForm;
