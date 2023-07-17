import { useEffect } from "react";
import { createPortal } from "react-dom";
import ModalContent from "../ModalContent";
interface ModalContainerProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  userType: string;
}
const ModalContainer = ({
  isModalVisible,
  toggleModal,
  userType,
}: ModalContainerProps) => {
  const modalContainer = document.querySelector(".modal-container");
  useEffect(() => {
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    document.body.appendChild(modalContainer);

    return () => {
      document.body.removeChild(modalContainer);
    };
  }, []);

  return (
    <>
      {modalContainer && isModalVisible
        ? createPortal(
            <ModalContent userType={userType} toggleModal={toggleModal} />,
            modalContainer
          )
        : null}
    </>
  );
};

export default ModalContainer;
