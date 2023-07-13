import { Tooltip } from "react-tooltip";
import { useDropzone } from "react-dropzone";
import Info from "./assets/infoIcon.svg";
import Upload from "./assets/uploadIcon.svg";
import useCloudinaryUpload from "./hooks/useCloudinaryUpload";
import Close from "./assets/closeIcon.svg";
import Edit from "./assets/editIcon.svg";

import { createRef, RefObject } from "react";
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

const Label = ({
  label,
  infoIconText,
}: {
  label: string;
  infoIconText?: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <label className="text-gray-200 font-bold text-lg" htmlFor={label}>
        {label}
        <span className="text-error-300">*</span>
      </label>
      {infoIconText && <InfoIcon text={infoIconText} />}
    </div>
  );
};

const InputField = ({ placeholder }: { placeholder: string }) => {
  return (
    <div className="mb-10">
      <input
        className="w-full bg-transparent border border-gray-400  mt-2 p-3 outline-none   placeholder:text-gray-500"
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

const InfoIcon = ({ text }: { text: string }) => {
  return (
    <>
      <a className="my-anchor-element">
        <div className="flex justify-center border border-white border-1 rounded-xl w-4 h-4  ">
          <img src={Info} alt="info icon" />
        </div>
      </a>
      <Tooltip anchorSelect=".my-anchor-element" place="top">
        {text}
      </Tooltip>
    </>
  );
};

const Thumbnail = () => {
  const { uploadImage, imageUrl, removeImage, isLoading, error } =
    useCloudinaryUpload();
  const dropzoneRef: RefObject<HTMLInputElement> = createRef();
  const { getRootProps, getInputProps } = useDropzone({
    async onDrop(acceptedFiles) {
      await uploadImage(acceptedFiles[0]);
    },
  });

  const editImage = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current;
      console.log(dropzoneRef.current);
    }
  };
  return (
    <div
      {...getRootProps({
        className: "border border-dotted border-gray-400",
      })}
    >
      <input ref={dropzoneRef} {...getInputProps()} />
      <div className="flex flex-col justify-center items-center cursor-pointer">
        {isLoading ? (
          <p className="flex flex-col  items-center justify-center text-white h-[190px] py-10">
            Uploading...
          </p>
        ) : error ? (
          <p className="flex  items-center justify-center text-white h-[190px] py-10 cursor-pointer">
            {error?.error}
          </p>
        ) : imageUrl ? (
          <div className=" w-full relative">
            <img
              className=" w-full h-[190px]"
              src={imageUrl}
              alt="uploaded image"
            />
            <div className="absolute m-2 flex top-0 right-0">
              <img
                className="w-8 h-8 cursor-pointer"
                src={Close}
                alt="close icon"
                onClick={removeImage}
              />
              <img
                className="w-8 h-8 cursor-pointer"
                src={Edit}
                alt="edit icon"
                onClick={editImage}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center h-[190px] py-10">
            <img className="w-16 h-16 mb-3" src={Upload} alt="upload icon" />
            <div className="text-center">
              <p className="text-gray-300 text-lg">
                <span className="font-bold text-primary-50 text-lg ">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-gray-300 text-lg">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
