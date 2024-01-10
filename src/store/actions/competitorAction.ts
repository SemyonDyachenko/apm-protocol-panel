import axios, { AxiosError } from "axios"
import { AppDispatch } from "../store"

import { SERVER_URL } from "@/api/instance"
import competitorsSlice, { CompetitorData } from "../slices/competitorSlice"
import Competitor from "@/models/Competitor"

export const getCompetitorData =
  (accessToken: string | null) => async (dispatch: AppDispatch) => {
    if (accessToken) {
      try {
        dispatch(competitorsSlice.actions.getCompetitorLoading())
        const response = await axios.get<CompetitorData[]>(
          `${SERVER_URL}/competitor/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )

        dispatch(
          competitorsSlice.actions.getCompetitorSuccess(response.data[0])
        )
        return response.status
      } catch (error: AxiosError | any) {
        dispatch(
          competitorsSlice.actions.getCompetitorError(error.response.status)
        )
      }
    }
  }
