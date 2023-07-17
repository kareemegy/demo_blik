import { useState } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}
interface IFetchResponse {
  users: User[];
}
interface RequestOptions {
  headers: {
    "content-type": string;
    Authorization: string;
  };
  method: string;
  body?: string;
}

const useAuthenticatedFetch = () => {
  const [resData, setResData] = useState<IFetchResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (url: string, method: string, data?: object) => {
    setIsLoading(true);
    setResData(null);
    setError(null);

    const BASEURL = import.meta.env.VITE_BASE_URL as string;
    const token = import.meta.env.VITE_BEARER_TOKEN as string;
    const API_URL = `${BASEURL}${url}`;

    try {
      const requestOptions: RequestOptions = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: method,
      };

      if (method === "GET") {
        delete requestOptions.body;
      } else {
        requestOptions.body = JSON.stringify(data);
      }

      const response = await fetch(API_URL, requestOptions);
      const json = (await response.json()) as IFetchResponse;
      setResData(json);
      return resData;
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };
  const postData = async (url: string, data: object) => {
    await fetchData(url, "POST", data);
  };

  return { resData, isLoading, error, fetchData, postData };
};
export default useAuthenticatedFetch;
