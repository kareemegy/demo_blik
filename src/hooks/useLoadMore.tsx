import { useState, useEffect, useCallback, useRef } from "react";

interface Item {
  id: number;
  name: string;
  imageUrl: string;
}

interface LoadMoreResponse {
  data: Item[];
  isLoading: boolean;
  lastItemRef: React.MutableRefObject<HTMLLIElement | null>;
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

  const fetchMore = useCallback(async () => {
    isLoadingRef.current = true;
    try {
      const newData = await fetchData(offset, limit);
      setData((prevData) => [...prevData, ...newData]);
      setOffset((prevOffset: number) => prevOffset + limit);
    } catch (error) {
      console.error(error);
    } finally {
      isLoadingRef.current = false;
    }
  }, [fetchData, limit, offset]);

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
      if (entries[0].isIntersecting && !isLoadingRef.current) {
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
  }, [fetchMore, lastItemRef]);

  return { data, isLoading: isLoadingRef.current, lastItemRef };
};
export default useLoadMore;
