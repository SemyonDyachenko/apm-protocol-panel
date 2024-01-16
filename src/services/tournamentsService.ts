import { SERVER_URL } from "@/api/instance"
import Competitor from "@/models/Competitor"
import Tournament, { TournamentRegistration } from "@/models/Tournament"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const tournamentAPI = createApi({
  reducerPath: "tournamentAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchAllTournaments: build.query<Tournament[], number>({
      query: (league?: number) => ({
        url: "tournaments/",
        params: {
          _limit: 1000,
          league,
        },
      }),
    }),
    fetchOrganizedTournaments: build.query<Tournament[], number>({
      query: (organizer: number) => ({
        url: "tournaments/",
        params: {
          _limit: 1000,
          organizer,
        },
      }),
    }),
    fetchTournaments: build.query<Tournament[], number>({
      query: (active = 1) => ({
        url: "tournaments/",
        params: {
          _limit: 1000,
          active: active,
        },
      }),
    }),
    fetchTournament: build.query<Tournament, number>({
      query: (id: number) => ({
        url: "tournaments/" + id.toString(),
      }),
    }),
    fetchTournamentRegistration: build.query<TournamentRegistration[], number>({
      query: (tournamentId: number) => ({
        url: "tournament_registration/",
        params: {
          tournamentId,
        },
      }),
    }),
    fetchRegistration: build.query<TournamentRegistration[], number>({
      query: (id: number) => ({
        url: `tournament_registration/`,
        params: { id },
      }),
    }),
    fetchCompetitorTournaments: build.query<Tournament[], number>({
      query: (competitorId: number) => ({
        url: "competitorTournaments/",
        params: {
          competitorId,
        },
      }),
    }),
  }),
})
