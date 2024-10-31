// TrendingView.tsx
import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import VideoCard from "@/common/VideoCard";
import { useGetTrendingQuery } from "../../api";

const TrendingView: React.FC = () => {
  const { data, error, isLoading } = useGetTrendingQuery("NZ");

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading trending videos</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => (
        <VideoCard
          thumbnail={item.thumbnail}
          duration="4:22" // Assuming you've formatted item.duration
          title={item.title}
          uploaderAvatar={item.uploaderAvatar}
          uploaderName={item.uploaderName}
          uploaderVerified={item.uploaderVerified}
          views="4.2M" // Format item.views as needed
          uploadDate="1 day ago" // Format item.uploadedDate as needed
          videoId={item.url}
        />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default TrendingView;
