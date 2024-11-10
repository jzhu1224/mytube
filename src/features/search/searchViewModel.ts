import { useState } from "react";

interface SearchViewViewModelProps {
  keywords: string;
  setKeywords: (value: string) => void;
  showSearchPopup: boolean;
  setShowSearchPopup: (value: boolean) => void;
}

const useSearchViewViewModel = (): SearchViewViewModelProps => {
  const [showSearchPopup, setShowSearchPopup] = useState(true);
  const [keywords, setKeywords] = useState<string>("");

  return {
    keywords,
    setKeywords,
    showSearchPopup,
    setShowSearchPopup,
  };
};

export default useSearchViewViewModel;
