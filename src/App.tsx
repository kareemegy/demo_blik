import { Tooltip } from "react-tooltip";
import { useDropzone } from "react-dropzone";
import Info from "./assets/infoIcon.svg";
import Upload from "./assets/uploadIcon.svg";
import useCloudinaryUpload from "./hooks/useCloudinaryUpload";
import { useEffect } from "react";

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
  const { uploadImage, imageUrl, isLoading, error } = useCloudinaryUpload();
  const { getRootProps, getInputProps } = useDropzone({
    async onDrop(acceptedFiles) {
      await uploadImage(acceptedFiles[0]);
    },
  });

  return (
    <div
      {...getRootProps({
        className: "border border-dotted border-gray-400 py-10 ",
      })}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col justify-center items-center">
        {isLoading ? (
          <p>Uploading...</p>
        ) : error ? (
          <p className="text-white">{error?.error}</p>
        ) : imageUrl ? (
          <img className="w-full h-full" src={imageUrl} alt="uploaded image" />
        ) : (
          <div className="flex flex-col items-center">
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
{
  /* <div className="flex flex-col justify-center items-center">
{isLoading ? (
  <p>Uploading...</p>
) : imageUrl ? (
  <img className="w-full h-full" src={imageUrl} alt="uploaded image" />
) : (
  <div className="flex flex-col items-center">
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
</div> */
}
