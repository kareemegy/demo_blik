import Upload from "../../assets/uploadIcon.svg";

const ImageUploadPrompt = () => {
  return (
    <div className="flex flex-col items-center h-[190px] py-10">
      <img className="w-16 h-16 mb-3" src={Upload} alt="upload icon" />
      <div className="text-center">
        <p className="text-gray-300 text-sm md:text-lg">
          <span className="font-bold text-primary-50 text-sm md:text-lg ">
            Click to upload
          </span>{" "}
          or drag and drop
        </p>
        <p className="text-gray-300 text-sm md:text-lg">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>
    </div>
  );
};

export default ImageUploadPrompt;
