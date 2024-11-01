import { useGetVideoStreamsQuery } from "../../api";
import { useRoute } from "@react-navigation/native";

interface VideoPlayerViewModel {
  videoUrl: string | null;
  title: string;
  description: string;
  isLoading: boolean;
  error: boolean;
  thumbnailUrl: string | null;
  metadata: any;
}

export const useVideoPlayerViewModel = (): VideoPlayerViewModel => {
  const route = useRoute();
  const { id } = route.params as { id: string };

  // Function to extract the value of a parameter
  function getParameterValue(url: string, paramName: string): string | null {
    // Extracting the query string part after the '?'
    const queryString = decodeURIComponent(url).split("?")[1];

    // Using URLSearchParams to parse the query string
    const params = new URLSearchParams(queryString);

    // Returning the value of the parameter
    return params.get(paramName);
  }

  const videoId = getParameterValue(id, "v") || "";

  // Fetch video streams data using the video ID
  const { data, error, isLoading } = useGetVideoStreamsQuery(videoId);

  // Extract the first available video URL if data is available
  const videoUrl = data?.hls || data?.dash || null; //data?.videoStreams?.[0]?.url || null;
  const title = data?.title || "No Title";
  const description = data?.description || "No Description";

  return {
    thumbnailUrl: data?.thumbnailUrl || null,
    videoUrl,
    title,
    description,
    isLoading,
    error: !!error || !videoUrl,
    metadata: {
      uploader: data?.uploader,
      uploaderAvatar: data?.uploaderAvatar,
      uploaderSubscriberCount: data?.uploaderSubscriberCount,
      views: data?.views,
      uploadDate: data?.uploadDate,
      uploaderVerified: data?.uploaderVerified,
      likes: data?.likes,
      dislikes: data?.dislikes,
    },
  };
};
