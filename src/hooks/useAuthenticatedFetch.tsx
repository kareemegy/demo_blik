import { useState, useEffect } from "react";
interface IFetchResponse {
  data: string | number | object;
}
// type FormDataOrObject = FormData | { [key: string]: string };
const useAuthenticatedFetch = (url: string, method: string, data?: object) => {
  const [resData, setResData] = useState<IFetchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setResData(null);
    const BASEURL = import.meta.env.VITE_BASE_URL as string;
    const token = import.meta.env.VITE_BEARER_TOKEN as string;
    const API_URL = `${BASEURL}${url}`;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const requestOptions = {
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: method,
          body: JSON.stringify(data),
        };

        const response = await fetch(API_URL, requestOptions);
        const json = (await response.json()) as IFetchResponse;

        setResData(json);
        console.log(json);
      } catch (error) {
        console.log(error as Error);
      } finally {
        setIsLoading(false);
      }
      return;
    };

    if (data) {
      fetchData().catch((error) => {
        console.error(error);
      });
    }
  }, [url, data, method]);

  return { resData, isLoading, error };
};

export default useAuthenticatedFetch;
