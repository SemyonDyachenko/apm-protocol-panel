import axios, { AxiosError } from "axios"
import { AppDispatch } from "../store"
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
  round?: number
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

export const removeMatchesFromCategory =
  (
    hand: string,
    category: string,
    tournamentId: number,
    weight_classId: number
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<any>(
        `${SERVER_URL}/matches/remove_matches_of_category/`,
        {
          hand,
          category,
          tournamentId,
          weight_classId,
        }
      )
      console.log(response.data)
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
      return error
    }
  }

export const removeMatch =
  (matchId: number) => async (dispatch: AppDispatch) => {
    try {
      return await axios.delete<any>(`${SERVER_URL}/matches/${matchId}`, {
        params: {
          id: matchId,
        },
      })
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
