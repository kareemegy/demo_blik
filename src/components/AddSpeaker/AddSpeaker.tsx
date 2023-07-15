import { useState } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import AddSpeakerButton from "../AddSpeakerButton/AddSpeakerButton";

const AddSpeaker = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <AddSpeakerButton toggleModal={toggleModal} />
      <ModalContainer
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
    </>
  );
};
export default AddSpeaker;
