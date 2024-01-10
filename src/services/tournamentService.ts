import { SERVER_URL } from "@/api/instance"
import { TournamentNotification } from "@/models/Notification"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const notificationAPI = createApi({
  reducerPath: "notificationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
  endpoints: (build) => ({
    fetchAllTournamentNotifications: build.query<
      TournamentNotification[],
      number
    >({
      query: (competitorId) => ({
        url: "tournamentNotifications/",
        params: {
          competitorId,
          _limit: 100,
        },
      }),
    }),
  }),
})
