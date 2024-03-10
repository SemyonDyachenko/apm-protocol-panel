import axios, { AxiosError } from "axios"
import { AppDispatch } from "../store"
import { SERVER_URL } from "@/api/instance"
import Tournament from "@/models/Tournament"
import { TournamentWeightClass } from "@/models/WeightClass"

export interface TournamentData {
  name: string
  location: string
  description: string
  logo?: File | null
  banner?: File | null
  address: string
  organizer: number
  main_secretary?: number
  main_referee?: number
  date: string
  league?: number
  afisha?: File | null
}

export interface TournamentRegistrationData {
  competitor: number
  tournament: number
  weight_class: number
  category: string
}

export const changeTournamentStatus =
  (tournamentId: number, status: boolean) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<Tournament>(
        `${SERVER_URL}/startTournament/${tournamentId}/`,
        { activated: status, tournamentId }
      )
      return response
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const getTournamentWeightClasses =
  (tournamentId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get<TournamentWeightClass[]>(
        `${SERVER_URL}/tournament_weightclasses/?tournamentId=${tournamentId}`
      )
      return response.data
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const registerForTournament =
  (data: TournamentRegistrationData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/tournament_registration/`,
        data
      )
      return response
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const confirmTournamentRegistration =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/tournament_registration_confirm/${id}/`,
        { id }
      )
      return response
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const updateTournamentRegistration =
  (
    id: number,
    weight: number,
    weight_class: number,
    category: string,
    confirm: boolean,
    paid: boolean,
    hand: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/tournament_registration/${id}/`,
        { id, weight_class, weight, category, confirm, paid, hand }
      )
      return response
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const deleteTournamentRegistration =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.delete(
        `${SERVER_URL}/tournament_registration_delete/${id}/`,
        {
          params: {
            id,
          },
        }
      )
      return response
    } catch (e: AxiosError | any) {
      console.log(e.message)
    }
  }

export const tournamentActive =
  (tournamentId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.put<any>(
        `${SERVER_URL}/tournamentActive/${tournamentId}/`,
        {
          tournamentId,
        }
      )
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }

export const createTournamentWeightClasses =
  (tournamentId: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<any>(
        `${SERVER_URL}/createTournamentWeightClasses/`,
        {
          tournamentId,
          ...data,
        }
      )
      return response
    } catch (error: AxiosError | any) {
      console.log(error.message)
    }
  }
