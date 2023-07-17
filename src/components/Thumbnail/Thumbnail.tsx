import { useDropzone } from "react-dropzone";
import Upload from "../../assets/uploadIcon.svg";
import useCloudinaryUpload from "../../hooks/useCloudinaryUpload";
import Close from "../../assets/closeIcon.svg";
import Edit from "../../assets/editIcon.svg";
import { useEffect } from "react";
import { createRef, RefObject } from "react";
interface ProfileUploadProps {
  onChange: (imageUrl: string | undefined) => void;
  restImg: boolean;
}

const Thumbnail = ({ onChange, restImg }: ProfileUploadProps) => {
  const { uploadImage, imageUrl, removeImage, isLoading, error } =
    useCloudinaryUpload();

  const { getRootProps, getInputProps } = useDropzone({
    async onDrop(acceptedFiles) {
      await uploadImage(acceptedFiles[0]);
    },
  });

  const dropzoneRef: RefObject<HTMLInputElement> = createRef();

  const editImage = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current;
      console.log(dropzoneRef.current);
    }
  };
  useEffect(() => {
    if (imageUrl) {
      onChange(imageUrl);
    }
  }, [imageUrl, onChange]);

  useEffect(() => {
    if (restImg) {
      removeImage();
    }
  }, [restImg]);
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
          <ImageUploadPrompt />
        )}
      </div>
    </div>
  );
};

export default Thumbnail;
const ImageUploadPrompt = () => {
  return (
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
  );
};
