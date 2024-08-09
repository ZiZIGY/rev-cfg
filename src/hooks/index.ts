import { AppDispatch, RootState, useFetchReturnType } from "../@types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useFetch = (
  url: RequestInfo,
  options: RequestInit,
  dependencies?: any[],
  condition?: boolean,
  callbacks?: {
    onSuccess?: (data: any) => void;
    onError?: (error: unknown) => void;
    onLoading?: () => void;
    onFinally?: () => void;
  }
): useFetchReturnType => {
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState();

  useEffect(() => {
    if (!condition) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        callbacks?.onLoading?.();
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}, ${response.statusText}`
          );
        } else {
          setFetchedData(await response.json());
        }
        callbacks?.onSuccess?.(fetchedData);
      } catch (error) {
        callbacks?.onError?.(error);
      } finally {
        setLoading(false);
        callbacks?.onFinally?.();
      }
    };

    fetchData();
  }, dependencies);

  return { loading, fetchedData };
};
