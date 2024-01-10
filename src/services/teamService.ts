import { SERVER_URL } from "../api/instance"
import Team, { TeamCompetitor } from "../models/Team"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const teamAPI = createApi({
  reducerPath: "teamAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchTeam: build.query<Team, number>({
      query: (teamId) => ({
        url: `team/${teamId}`,
        params: {
          _limit: 500,
        },
      }),
    }),
    fetchOrganizedTeams: build.query<Team[], number>({
      query: (organizerId) => ({
        url: `team/`,
        params: {
          organizerId,
          _limit: 500,
        },
      }),
    }),
    fetchCompetitorTeams: build.query<TeamCompetitor[], number>({
      query: (competitorId) => ({
        url: `competitorTeams/`,
        params: {
          competitorId,
          _limit: 500,
        },
      }),
    }),
    fetchTeamCompetitors: build.query<TeamCompetitor[], number>({
      query: (teamId) => ({
        url: `competitorTeams/`,
        params: {
          teamId,
          _limit: 500,
        },
      }),
    }),
  }),
})
