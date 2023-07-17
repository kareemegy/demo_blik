import { useState, useEffect, useCallback, useRef } from "react";

interface Item {
  id: number;                 
  first_name: string;                 
  last_name: string;                  
  avatar: string;                 
}

interface LoadMoreResponse {
  data: Item[];
  isLoading: boolean;
  lastItemRef: React.MutableRefObject<HTMLLIElement | null>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoadMoreOptions {
  limit: number;
}

const useLoadMore = (
  fetchData: (offset: number, limit: number) => Promise<Item[]>,
  options?: LoadMoreOptions,
  initialOffset = 0
): LoadMoreResponse => {
  const [data, setData] = useState<Item[]>([]);
  const [offset, setOffset] = useState<number>(initialOffset);
  const limit = options?.limit || 10;
  const lastItemRef = useRef<HTMLLIElement>(null);
  const isLoadingRef = useRef<boolean>(false);
  const isInitializedRef = useRef<boolean>(false);
  const [isSearching, setIsSearching] = useState(false);

  const fetchMore = useCallback(async () => {
    console.log(offset, limit);

    if (isSearching) return;
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      const newData = await fetchData(offset, limit);
      if (newData.length === 0) {
        return;
      }
      setData((prevData) => {
        const filteredData = newData.filter((item) => {
          const index = prevData.findIndex(
            (prevItem) => prevItem.id === item.id
          );
          return index === -1;
        });
        return [...prevData, ...filteredData];
      });
      setOffset((prevOffset: number) => prevOffset + limit);
    } catch (error) {
      console.error(error);
    } finally {
      isLoadingRef.current = false;
    }
  }, [fetchData, limit, offset, isSearching]);

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return;
    }

    const fetchData = async () => {
      if (offset === 0) {
        await fetchMore();
      }
    };

    fetchData().catch((error) => console.error(error));
  }, [fetchMore, offset]);

  useEffect(() => {
    const handleObserver = async (entries: IntersectionObserverEntry[]) => {
      if (isSearching) return;

      if (
        entries[0].isIntersecting &&
        !isLoadingRef.current &&
        data.length > 0
      ) {
        await fetchMore();
      }
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      void handleObserver(entries);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => observer.disconnect();
  }, [fetchMore, lastItemRef, data.length, isSearching]);

  return {
    data,
    isLoading: isLoadingRef.current,
    lastItemRef,
    setIsSearching,
  };
};
export default useLoadMore;
