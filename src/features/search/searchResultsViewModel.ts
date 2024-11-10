import { SearchItem } from "../../api/types";
import { useSearchResultModel } from "./searchResultsModel";

interface SearchViewModel {
  keywords: string;
  results: SearchItem[] | undefined;
  isLoading: boolean;
  error: boolean;
}

export const useSearchResultViewModel = (keywords: string): SearchViewModel => {
  const { data, error, isLoading } = useSearchResultModel(keywords);

  return {
    keywords,
    results: data?.items,
    isLoading,
    error: !!error,
  };
};
