import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Pressable,
} from "react-native";
import { useSearchViewModel } from "./searchViewModel";
import VideoCard from "@/common/VideoCard";
import { formatNumber, secondsToHMS } from "@/utils/formatUtils";
import { useRouter } from "expo-router";

const SearchResultsView: React.FC = () => {
  const { query, setQuery, results, suggestions, isLoading, error } =
    useSearchViewModel();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === "channel") {
      return (
        <Pressable
          style={styles.channelContainer}
          onPress={() => {
            console.log("item", item);
            router.push({ pathname: item.url });
          }}
        >
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subText}>
              {item.subscribers ? `${item.subscribers} subscribers` : ""}
            </Text>
            <Text style={styles.subText}>{item.description}</Text>
          </View>
        </Pressable>
      );
    } else if (item.type === "stream") {
      return (
        <VideoCard
          thumbnail={item.thumbnail}
          duration={secondsToHMS(item.duration)} // Assuming you've formatted item.duration
          title={item.title}
          uploaderAvatar={item.uploaderAvatar}
          uploaderName={item.uploaderName}
          uploaderVerified={item.uploaderVerified}
          views={formatNumber(item.views)} // Format item.views as needed
          uploadDate={item.uploadedDate} // Format item.uploadedDate as needed
          videoId={item.url}
        />
      );
    }
    return null;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false); // Hide suggestions after selection
    inputRef.current?.blur(); // Dismiss keyboard
  };

  const renderSuggestion = ({ item }: { item: string }) => (
    <Pressable
      onPress={() => handleSuggestionClick(item)}
      style={styles.suggestionItem}
    >
      <Text style={styles.suggestionText}>{item}</Text>
    </Pressable>
  );

  const handleInputFocus = () => {
    if (suggestions && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputChange = (text: string) => {
    setQuery(text);
    setShowSuggestions(
      !!(text.length > 0 && suggestions && suggestions.length > 0)
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder="Search..."
        value={query}
        onFocus={handleInputFocus}
        onChangeText={handleInputChange}
      />

      {showSuggestions && suggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsPopover}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item}
            renderItem={renderSuggestion}
            style={styles.suggestionsList}
          />
        </View>
      )}
      {isLoading && <ActivityIndicator size="large" color="#000" />}
      {error && <Text style={styles.errorText}>Error loading results</Text>}
      <FlatList
        data={results}
        keyExtractor={(item) => item.url}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  suggestionsPopover: {
    position: "absolute",
    top: 55, // Adjust based on your layout to position it just below the TextInput
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  suggestionsList: {
    maxHeight: 150,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
  channelContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  streamContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  subText: {
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchResultsView;
