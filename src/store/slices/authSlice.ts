import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { access } from "fs"
import { AuthData } from "../actions/authAction"

export interface AuthState {
  access: string
  refresh: string
  isAuth: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  access: "",
  refresh: "",
  isAuth: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthLoading: (state) => {
      state.loading = true
    },
    setAuthSuccess: (state, action: PayloadAction<AuthData>) => {
      state.access = action.payload.access
      state.refresh = action.payload.refresh
      state.loading = false
      state.error = null
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.access = ""
      state.refresh = ""
      state.loading = false
      state.error = action.payload
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
      state.loading = false
      state.error = null
    },
    refreshTeken(state, action: PayloadAction<string>) {
      state.access = action.payload
      state.loading = false
      state.error = null
    },
  },
})

export const { setAuthLoading, setAuthSuccess, setAuthError } =
  authSlice.actions

export default authSlice
