import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface roleState {
  role: string | null
  loading: boolean
  error: string | null
}
const initialState: roleState = {
  role: null,
  loading: false,
  error: null,
}

const rolesSlice = createSlice({
  name: "roles",
  initialState: initialState,
  reducers: {
    getRoleLoading: (state) => {
      state.loading = true
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
    getRoleError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { setRole, getRoleLoading, getRoleError } = rolesSlice.actions

export default rolesSlice
