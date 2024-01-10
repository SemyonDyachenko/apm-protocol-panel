import { SERVER_URL } from "@/api/instance"
import { AverageRating, LeagueReview, TournamentReview } from "@/models/Review"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const reviewAPI = createApi({
  reducerPath: "reviewAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchAllTournamentReviews: build.query<TournamentReview[], number>({
      query: (tournamentId) => ({
        url: "tournamentReviews/",
        params: {
          tournamentId,
          _limit: 500,
        },
      }),
    }),
    fetchTournamentRating: build.query<AverageRating, number>({
      query: (tournamentId) => ({
        url: "averageTournamentReviews/get_avarage/",
        params: {
          tournamentId,
          _limit: 500,
        },
      }),
    }),
    fetchAllLeagueReviews: build.query<LeagueReview[], number>({
      query: (leagueId) => ({
        url: "leagueReviews/",
        params: {
          leagueId,
          _limit: 500,
        },
      }),
    }),
    fetchLeagueRating: build.query<AverageRating, number>({
      query: (leagueId) => ({
        url: "averageLeagueReviews/get_avarage/",
        params: {
          leagueId,
          _limit: 500,
        },
      }),
    }),
  }),
})
