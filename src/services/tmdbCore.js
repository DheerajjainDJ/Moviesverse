import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbCoreApi = createApi({
  reducerPath: "tmdbCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org",
  }),
  endpoints: (builder) => ({
    getTrendingData: builder.query({
      query: (page = 1) =>
        `/3/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}`,
    }),
    getDetailInfo: builder.query({
      query: ({ type, id }) =>
        `/3/${type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
    }),
    getSocialHandles: builder.query({
      query: ({ type, id }) =>
        `/3/${type}/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    }),
    getVideoKey: builder.query({
      query: ({ type, id }) =>
        `/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
    }),
    getCastAndCrew: builder.query({
      query: ({ type, id }) =>
        `/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
    }),
    getSimilarContent: builder.query({
      query: ({ type, id }) =>
        `/3/${type}/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`,
    }),
    getMovies: builder.query({
      query: ({ page = 1, genreForUrl }) =>
        `/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`,
    }),
    getTvData: builder.query({
      query: ({ page = 1, genreForUrl }) =>
        `/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`,
    }),
  }),
});

export const {
  useGetTrendingDataQuery,
  useGetDetailInfoQuery,
  useGetSocialHandlesQuery,
  useGetVideoKeyQuery,
  useGetCastAndCrewQuery,
  useGetSimilarContentQuery,
  useGetMoviesQuery,
  useGetTvDataQuery,
} = tmdbCoreApi;
