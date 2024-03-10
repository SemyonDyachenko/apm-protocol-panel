import axios, { AxiosError } from "axios"
import { AppDispatch } from "../store"
import authSlice from "../slices/authSlice"
import { SERVER_URL } from "@/api/instance"
import Match from "@/models/Match"

export interface MatchData {
  created_at?: string
  date: Date
  hand: string
  tournament: number
  weight_class: number
  first_competitor: number
  second_competitor: number
  category: string
  winner?: number
}

export const createMatch =
  (data: MatchData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<Match>(`${SERVER_URL}/matches/`, data)
      console.log(response.data)
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const defineWinnerMatch =
  (
    matchId: number,
    winner: number,
    first_new_rating: number,
    second_new_rating: number
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Match>(
        `${SERVER_URL}/matches/${matchId}/`,
        {
          matchId,
          winner,
          first_new_rating,
          second_new_rating,
        }
      )
      console.log(response.data)
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }
