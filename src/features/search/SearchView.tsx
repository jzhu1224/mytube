import React, { useState } from "react";
import SearchPopup from "./SearchPopup";
import SearchResultsView from "./SearchResultsView";
import { TextInput, View, StyleSheet } from "react-native";

const SearchView = () => {
  const [showSearchPopup, setShowSearchPopup] = useState(true);
  const [keywords, setKeywords] = useState<string>("");

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={keywords}
        onChangeText={setKeywords}
        onFocus={() => {
          setShowSearchPopup(true);
        }}
      />
      {showSearchPopup ? (
        <SearchPopup
          keyword={keywords}
          onHandleSearchCallback={(keywords: string) => {
            setShowSearchPopup(false);
            setKeywords(keywords);
          }}
        />
      ) : (
        <SearchResultsView
          keywords={keywords}
          handleInputFocus={() => {
            setShowSearchPopup(true);
          }}
        />
      )}
    </View>
  );
};
export default SearchView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    marginTop: 10,
    marginBottom: 16,
    marginHorizontal: 16,
  },
});
