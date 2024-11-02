// src/features/channel/ChannelScreen.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useGetChannelQuery } from "../../api";
import VideoCard from "@/common/VideoCard";

const ChannelScreen: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { data: channel, isLoading, error } = useGetChannelQuery(id);

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#000" />
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error loading channel</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Channel Banner */}
      {channel?.bannerUrl && (
        <Image source={{ uri: channel.bannerUrl }} style={styles.banner} />
      )}

      {/* Channel Info */}
      <View style={styles.channelInfoContainer}>
        <Image source={{ uri: channel?.avatarUrl }} style={styles.avatar} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.channelName}>{channel?.name}</Text>
          <Text style={styles.subscriberCount}>
            Subscribe - {channel?.subscriberCount}K
          </Text>
        </View>
      </View>

      {/* Related Streams */}
      <FlatList
        data={channel?.relatedStreams}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <VideoCard
            videoId={item.url}
            views={`${item.views}`}
            thumbnail={item.thumbnail}
            uploadDate={item.uploadedDate}
            title={item.title}
            uploaderName={item.uploaderName}
            uploaderAvatar={item.uploaderAvatar}
            uploaderVerified={item.uploaderVerified}
            duration={`${item.duration}`}
          />
        )}
        contentContainerStyle={styles.relatedStreamsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  banner: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  channelInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#000",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  infoTextContainer: {
    justifyContent: "center",
  },
  channelName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  subscriberCount: {
    fontSize: 14,
    color: "#aaa",
  },
  relatedStreamsContainer: {
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ChannelScreen;
