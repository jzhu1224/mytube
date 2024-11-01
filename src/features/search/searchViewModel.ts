import { useState } from "react";
import { useSearchQuery, useSuggestionsQuery } from "../../api";
import { SearchItem } from "../../api/types";

interface SearchViewModel {
  query: string;
  setQuery: (query: string) => void;
  results: SearchItem[] | undefined;
  suggestions: string[] | undefined;
  isLoading: boolean;
  error: boolean;
}

export const useSearchViewModel = (): SearchViewModel => {
  const [query, setQuery] = useState("");
  const { data, error, isLoading } = useSearchQuery(query);
  const { data: suggestionsData } = useSuggestionsQuery(query, {
    skip: query.length < 2,
  });

  return {
    query,
    setQuery,
    results: data?.items,
    suggestions: suggestionsData ? suggestionsData[1] : [],
    isLoading,
    error: !!error,
  };
};
