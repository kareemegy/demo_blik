import React, { useState } from "react";
import Button from "../Button";
import InputField from "../InputField";
import Label from "../Label";
import ProfileUpload from "../ProfileUpload/ProfileUpload";
import useAuthenticatedFetch from "../../hooks/useAuthenticatedFetch";

interface ModalContentProps {
  toggleModal: () => void;
  userType: string;
}

const ModalContent: React.FC<ModalContentProps> = ({
  toggleModal,
  userType,
}) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [data, setData] = useState<object | undefined>(undefined);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const EVENTID = 8;

  const { resData, postData } = useAuthenticatedFetch();
  const handleCreateUser = () => {
    (async () => {
      const formError = validateForm();
      if (formError !== "") {
        setFormError(formError);
        return;
      }
      const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        event_id: EVENTID,
        image: photoUrl,
      };
      await postData("create-users", data);

      setData(data);
      if (resData) {
        handleReset();
      }
    })().catch((error) => console.log(error));
  };
  const validateForm = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /\S+@\S+\.\S+/;

    if (firstName === "" || lastName === "" || email === "") {
      return "Please fill all the fields";
    }

    if (!nameRegex.test(firstName)) {
      return "Please enter a valid first name";
    }

    if (!nameRegex.test(lastName)) {
      return "Please enter a valid last name";
    }

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    if (photoUrl === undefined) {
      return "Please upload a photo";
    }

    return "";
  };
  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhotoUrl("");
    setFormError("User created successfully");
  };
  const handlePhotoChange = (imageUrl: string | undefined) => {
    setPhotoUrl(imageUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="bg-gray-800 border border-primary-600 p-8 shadow-lg z-10 w-[350px]">
        {formError && <p className="text-error-300">{formError}</p>}
        <div className=" mb-4">
          <h1 className="text-xl font-bold text-white">Add {userType}</h1>
        </div>
        <div>
          <div>
            <h1 className="text-white">Photo</h1>
          </div>
          <ProfileUpload onChange={handlePhotoChange} />
        </div>
        <div>
          <Label label="First Name" />
          <InputField
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Label label="Last Name" />
          <InputField
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Label label="Email" />
          <InputField
            placeholder="JohnDoe@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-5">
          <Button onClick={toggleModal} title="Cancel " style="black" />
          <Button title="Add" style="white" onClick={handleCreateUser} />
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
