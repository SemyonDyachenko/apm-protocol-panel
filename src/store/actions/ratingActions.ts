import axios, { AxiosError } from "axios"
import { AppDispatch } from "../store"
import authSlice from "../slices/authSlice"
import { SERVER_URL } from "@/api/instance"
import Match from "@/models/Match"
import Competitor from "@/models/Competitor"

export interface RatingData {
  id: number
  elo_rating: number
}

export const updateCompetitorRating =
  (data: RatingData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Competitor>(
        `${SERVER_URL}/updaterating/${data.id}/`,
        data
      )
      console.log(response.data)
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }
