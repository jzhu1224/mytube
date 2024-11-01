import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  SearchResponse,
  SuggestionsResponse,
  TrendingItem,
  VideoStreamsResponse,
  ChannelResponse,
} from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pipedapi.nosebs.ru/",
  }),
  endpoints: (builder) => ({
    getTrending: builder.query<TrendingItem[], string | undefined>({
      query: (region = "US") => `/trending?region=${region}`,
    }),
    getVideoStreams: builder.query<VideoStreamsResponse, string>({
      query: (videoId) => `/streams/${videoId}`,
    }),
    search: builder.query<SearchResponse, string>({
      query: (query) => `/search?q=${query}&filter=all`,
    }),
    suggestions: builder.query<SuggestionsResponse, string>({
      query: (query) => `/opensearch/suggestions?query=${query}`,
    }),
    getChannel: builder.query<ChannelResponse, string>({
      query: (channelId) => `/channel/${channelId}`,
    }),
  }),
});

export const {
  useGetTrendingQuery,
  useGetVideoStreamsQuery,
  useSearchQuery,
  useSuggestionsQuery,
  useGetChannelQuery,
} = api;
export default api;
