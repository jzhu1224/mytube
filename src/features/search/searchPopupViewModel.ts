import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addHistoryItem, deleteHistoryItem } from "../../store/searchSlice";
import { useSuggestionsQuery } from "../../api";

export const useSearchPopupViewModel = (keyword: string) => {
  const dispatch = useDispatch();
  const searchHistory = useSelector((state: RootState) => state.search.history);

  const { data: suggestions } = useSuggestionsQuery(keyword, {
    skip: keyword?.length < 1,
  });

  const handleSearch = (term: string) => {
    dispatch(addHistoryItem(term)); // Add term to Redux history
  };

  const handleDeleteHistoryItem = (item: string) => {
    dispatch(deleteHistoryItem(item)); // Remove term from Redux history
  };

  return {
    searchHistory,
    suggestions: suggestions ? suggestions[1] : [],
    handleSearch,
    handleDeleteHistoryItem,
  };
};
