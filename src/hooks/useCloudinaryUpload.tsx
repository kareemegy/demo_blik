import { useState, useEffect, useCallback } from "react";

interface CloudinaryResponse {
  secure_url: string;
}
interface IError {
  error: string | any;
}
const useCloudinaryUpload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<IError | null>(null);

  const uploadImage = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const img = await createImageBitmap(file);
      if (img.width > 800 || img.height > 400) {
        const errorMessage = "Image dimensions must be 800x400 or smaller,please try again.";
        setError({ error: errorMessage });
        throw new Error(errorMessage);
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "blinkpresetname");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djvvfm9lh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = (await response.json()) as CloudinaryResponse;
      setImageUrl(data.secure_url);
    } catch (error) {
      const errorMessage = "Something went wrong. Please try again later.";
      setError({ error: errorMessage });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return {
    isLoading,
    imageUrl,
    uploadImage,
    error,
  };
};

export default useCloudinaryUpload;
