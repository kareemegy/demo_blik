import { useDropzone } from "react-dropzone";
import UploadPlaceHolder from "../../assets/UploadPlaceHolder.svg";
import useCloudinaryUpload from "../../hooks/useCloudinaryUpload";
import { createRef, RefObject } from "react";
const ProfileUpload = () => {
  const { uploadImage, imageUrl, isLoading, error } = useCloudinaryUpload();

  const { getRootProps, getInputProps } = useDropzone({
    async onDrop(acceptedFiles) {
      await uploadImage(acceptedFiles[0]);
    },
  });
  const dropzoneRef: RefObject<HTMLInputElement> = createRef();
  return (
    <div
      {...getRootProps({
        className: "border border-dotted border-gray-400",
      })}
      className="flex justify-center"
    >
      <input ref={dropzoneRef} {...getInputProps()} />
      {isLoading ? (
        <p className="flex flex-col  items-center justify-center text-white h-[190px] py-10">
          Uploading...
        </p>
      ) : error ? (
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <img className="" src={UploadPlaceHolder} alt="upload image" />
          <p className="flex  items-center justify-center text-error-300 mb-5 ">
            {error?.error}
          </p>
        </div>
      ) : imageUrl ? (
        <img
          className="w-[160px] h-[160px] rounded-full object-fill "
          src={imageUrl}
          alt="upload image"
        />
      ) : (
        <img src={UploadPlaceHolder} alt="upload image" />
      )}
    </div>
  );
};

export default ProfileUpload;
