import { useState } from "react";
import ModalContainer from "../ModalContainer";
import CreateUserButton from "../CreateUserButton";
interface Props {
  userType: string;
}
const CreateUser = ({ userType }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <CreateUserButton userType={userType} toggleModal={toggleModal} />
      <ModalContainer
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        userType={userType}
      />
    </>
  );
};
export default CreateUser;
