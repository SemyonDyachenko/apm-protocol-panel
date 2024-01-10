import axios, { AxiosError } from "axios"
import { AppDispatch } from "../store"
import authSlice from "../slices/authSlice"
import { SERVER_URL } from "@/api/instance"
import Match from "@/models/Match"

export interface MatchData {
  created_at: string
  date: string
  hand: string
  tournament: number
  weight_class: number
  first_competitor: number
  second_competitor: number
  winner: number
}

export const createMatch =
  (data: MatchData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<Match>(`${SERVER_URL}/matches/`, data)
      console.log(response.data)
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }
