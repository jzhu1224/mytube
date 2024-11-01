import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Video, VideoRef } from "react-native-video";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useVideoPlayerViewModel } from "./videoPlayerViewModel";
import { formatNumber } from "@/utils/formatNumber";
import dayjs from "dayjs";

const VideoPlayerView: React.FC = () => {
  const {
    videoUrl,
    thumbnailUrl,
    title,
    description,
    isLoading,
    error,
    metadata,
  } = useVideoPlayerViewModel();
  const [showDescription, setShowDescription] = useState(false);

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.loader} size="large" color="#fff" />
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Failed to load video.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Video Player */}
      {videoUrl && (
        <Video
          // Can be a URL or a local file.
          source={{
            uri: videoUrl,
          }}
          // Store reference
          //ref={videoRef}
          style={styles.video}
          controls
          poster={{ source: { uri: thumbnailUrl || "" } }}
        />
      )}

      {/* Video Title and Stats */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>
            {metadata.views} views |{" "}
            {dayjs(metadata.uploadDate).format("DD MMM YYYY")}
          </Text>
          <View style={styles.reactionsContainer}>
            <View style={styles.reaction}>
              <Icon name="thumb-up-outline" size={18} color="#fff" />
              <Text style={styles.reactionText}>
                {formatNumber(metadata.likes)}
              </Text>
            </View>
            <View style={styles.reaction}>
              <Icon name="thumb-down-outline" size={18} color="#fff" />
              <Text style={styles.reactionText}>
                {formatNumber(metadata.dislikes)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Channel Info */}
      <View style={styles.channelContainer}>
        <Image
          source={{ uri: metadata.uploaderAvatar }}
          style={styles.channelAvatar}
        />
        <View style={styles.channelInfo}>
          <Text style={styles.channelName}>
            {metadata.uploader}{" "}
            <Icon name="check-decagram" size={16} color="#4CAF50" />
          </Text>
          <Text style={styles.subscribeText}>
            {formatNumber(metadata.uploaderSubscriberCount)} subscribers
          </Text>
        </View>
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="playlist-plus" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Add to playlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="rss" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Subscribe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-variant" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="download" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Download</Text>
        </TouchableOpacity>
      </View>

      {/* Description Toggle */}
      <TouchableOpacity
        style={styles.showDescriptionButton}
        onPress={() => setShowDescription(!showDescription)}
      >
        <Text style={styles.showDescriptionText}>
          {showDescription ? "Hide Description" : "Show Description"}
        </Text>
      </TouchableOpacity>
      {showDescription && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: 250,
    backgroundColor: "#000",
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stats: {
    color: "#ccc",
    fontSize: 14,
  },
  reactionsContainer: {
    flexDirection: "row",
  },
  reaction: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  reactionText: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 14,
  },
  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  channelAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  subscribeText: {
    color: "#ccc",
    fontSize: 14,
  },
  subscribeButton: {
    backgroundColor: "#cc0000",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  subscribeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  actionButton: {
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  showDescriptionButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#333",
    alignItems: "center",
  },
  showDescriptionText: {
    color: "#fff",
    fontSize: 14,
  },
  description: {
    color: "#ccc",
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default VideoPlayerView;
