// import { useState, useEffect } from "react";

// interface IFetchResponse {
//   data: string | number | object;
// }

// const useAuthenticatedFetch = (url: string) => {
//   const [data, setData] = useState<null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const token = "YOUR_TOKEN_HERE";
//         const response = await fetch(url, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const json = (await response.json()) as IFetchResponse;
//         setData(json);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   return [data, isLoading, error];
// };

// export default useAuthenticatedFetch;
