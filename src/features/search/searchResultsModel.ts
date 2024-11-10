import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useSearchQuery } from "../../api";
import { SearchResponse } from "../../api/types";
import { SerializedError } from "@reduxjs/toolkit";

interface SearchViewModel {
  keywords: string;
  data: SearchResponse | undefined;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const useSearchResultModel = (keywords: string): SearchViewModel => {
  const { data, error, isLoading } = useSearchQuery(keywords);

  return {
    keywords,
    data,
    isLoading,
    error,
  };
};
