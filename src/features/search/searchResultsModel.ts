import { useSearchQuery } from "../../api";
import { SearchItem } from "../../api/types";

interface SearchViewModel {
  keywords: string;
  results: SearchItem[] | undefined;
  isLoading: boolean;
  error: boolean;
}

export const useSearchResultModel = (keywords: string): SearchViewModel => {
  const { data, error, isLoading } = useSearchQuery(keywords);

  return {
    keywords,
    results: data?.items,
    isLoading,
    error: !!error,
  };
};
