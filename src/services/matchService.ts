import { SERVER_URL } from "@/api/instance"
import Competitor from "@/models/Competitor"
import Match from "@/models/Match"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const matchAPI = createApi({
  reducerPath: "matchAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchAllMatches: build.query<Match[], number>({
      query: (limit: number = 5000) => ({
        url: "matches/",
        params: {
          _limit: limit,
        },
      }),
    }),
    fetchMatches: build.query<Match[], number>({
      query: (tournamentId: number) => ({
        url: "matcheslist/",
        params: {
          tournament_id: tournamentId,
        },
      }),
    }),
    fetchCompetitorMatches: build.query<Match[], number>({
      query: (competitorId: number) => ({
        url: "matcheslist/",
        params: {
          competitorId,
        },
      }),
    }),
    createMatch: build.query<Match, Object>({
      query: (data: Object) => ({
        url: "matches/",
        params: data,
      }),
    }),
  }),
})
