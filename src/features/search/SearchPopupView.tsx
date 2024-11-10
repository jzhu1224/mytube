import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { useSearchPopupViewModel } from "./searchPopupViewModel";

const SearchPopup = (props: {
  onHandleSearchCallback: (keywords: string) => void;
  keyword: string;
}) => {
  const { keyword } = props;

  const { searchHistory, suggestions, handleSearch, handleDeleteHistoryItem } =
    useSearchPopupViewModel(keyword);

  const handleSearchCallback = (query: string) => {
    handleSearch(query);
    props.onHandleSearchCallback(query);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {/* Show Suggestions if there's a query, otherwise show History */}
        {keyword?.length > 0 ? (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSearchCallback(item)}
                style={styles.itemContainer}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No suggestions found</Text>
            }
          />
        ) : (
          <FlatList
            data={searchHistory}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Swipeable
                renderRightActions={() => (
                  <TouchableOpacity
                    onPress={() => handleDeleteHistoryItem(item)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>DELETE</Text>
                  </TouchableOpacity>
                )}
              >
                <TouchableOpacity
                  onPress={() => handleSearchCallback(item)}
                  style={styles.itemContainer}
                >
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              </Swipeable>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No search history</Text>
            }
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchPopup;
