import axios, { AxiosError } from "axios"
import { AppDispatch } from "../store"
import authSlice from "../slices/authSlice"
import { SERVER_URL } from "@/api/instance"
import rolesSlice from "../slices/roleSlice"

export type AuthData = {
  access: string
  refresh: string
}

export type RefreshData = {
  access: string
}

export type SignupData = {
  first_name: string
  last_name: string
  email: string
  password: string
  gender: string
}

export const setAuth = (bool: boolean) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.setAuth(bool))
  } catch (e: Error | any) {
    console.log(e.message)
  }
}

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setAuthLoading())
      const response = await axios.post<AuthData>(`${SERVER_URL}/token/`, {
        email,
        password,
      })
      localStorage.setItem("apm_protocols_token", response.data.access)
      localStorage.setItem("apm_protocols_refresh", response.data.refresh)
      dispatch(authSlice.actions.setAuth(true))
      dispatch(authSlice.actions.setAuthSuccess(response.data))
      return response
    } catch (error: Error | any) {
      dispatch(authSlice.actions.setAuthError(error.message))
      return error.request
    }
  }

export const refreshLogin = () => async (dispatch: AppDispatch) => {
  try {
    if (localStorage.getItem("apm_protocols_refresh") !== null) {
      const response = await axios.post<RefreshData>(
        `${SERVER_URL}/token/refresh/`,
        {
          refresh: localStorage.getItem("apm_protocols_refresh"),
        }
      )

      localStorage.setItem("apm_protocols_token", response.data.access)
      dispatch(authSlice.actions.refreshTeken(response.data.access))
      dispatch(authSlice.actions.setAuth(true))
    }
  } catch (error: AxiosError | any) {
    console.log(error.message)
  }
}

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    //const response = await axios.post(`${SERVER_URL}/competitors/logout`)
    localStorage.removeItem("role")
    dispatch(rolesSlice.actions.setRole(null))

    setAuth(false)
    localStorage.removeItem("apm_protocols_token")
    localStorage.removeItem("apm_protocols_refresh")
  } catch (error: Error | any) {
    console.log(error.message)
    return error.request.status
  }
}
