import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TrendingItem, VideoDetails, VideoStreamsResponse } from "./types";

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
  }),
});

export const { useGetTrendingQuery, useGetVideoStreamsQuery } = api;
export default api;
