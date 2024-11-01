// VideoCard.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, router } from "expo-router";

interface VideoCardProps {
  thumbnail: string;
  duration: string;
  title: string;
  uploaderAvatar: string;
  uploaderName: string;
  uploaderVerified: boolean;
  views: string;
  uploadDate: string;
  videoId: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  thumbnail,
  duration,
  title,
  uploaderAvatar,
  uploaderName,
  uploaderVerified,
  views,
  uploadDate,
  videoId,
}) => {
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        router.push({ pathname: "/watch/[id]", params: { id: videoId } });
      }}
    >
      {/* Video thumbnail section */}
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        <Text style={styles.duration}>{duration}</Text>
      </View>

      {/* Video info section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>

        {/* Uploader information */}
        <View style={styles.uploaderContainer}>
          {uploaderAvatar && (
            <Image
              source={{ uri: uploaderAvatar }}
              style={styles.uploaderAvatar}
            />
          )}
          <Text style={styles.uploaderName}>
            {uploaderName}{" "}
            {uploaderVerified && (
              <MaterialCommunityIcons
                name="check-decagram"
                size={14}
                color="#4CAF50"
              />
            )}
          </Text>
        </View>

        <Text style={styles.views}>
          {views} • {uploadDate}
        </Text>

        {/* Action icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="thumb-up-outline"
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="share-variant"
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="playlist-plus"
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    marginVertical: 8,
    borderRadius: 8,
    overflow: "hidden",
    padding: 10,
    width: "100%",
  },
  thumbnailContainer: {
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  duration: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#000",
    color: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
  },
  infoContainer: {
    paddingTop: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  uploaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  uploaderAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  uploaderName: {
    color: "#bbb",
    fontSize: 14,
    fontWeight: "bold",
  },
  views: {
    color: "#777",
    fontSize: 12,
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
});

export default VideoCard;
