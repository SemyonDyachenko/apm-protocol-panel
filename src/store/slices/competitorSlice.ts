import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Competitor from "../../models/Competitor"
import { fetchCompetitors } from "../thunks/competitors"
import Team from "@/models/Team"

export interface CompetitorData {
  image: File | null
  id: number
  phone: string
  first_name: string
  last_name: string
  gender: string
  elo_rating: number
  email: string
  country: string
  is_active: boolean
  is_staff: boolean
  trainer?: number
  city?: string
  birthdate?: Date
  career_start_date?: Date
  height?: number
  description?: string
  weight: number
  mode: string
  grip?: number
  biceps?: number
  crossbar?: number
  shaft?: number
  militarypress?: number
  hand?: number
  press?: number
  side?: number
  verified?: boolean
  team?: number
}

export interface competitorState {
  competitor: CompetitorData | null
  loading: boolean
  error: string | null
}

const initialState: competitorState = {
  competitor: null,
  loading: false,
  error: null,
}

const competitorsSlice = createSlice({
  name: "competitors",
  initialState: initialState,
  reducers: {
    getCompetitorLoading: (state) => {
      state.loading = true
    },
    getCompetitorSuccess: (state, action: PayloadAction<CompetitorData>) => {
      state.competitor = action.payload
      state.loading = false
      state.error = null
    },
    getCompetitorError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const {
  getCompetitorLoading,
  getCompetitorSuccess,
  getCompetitorError,
} = competitorsSlice.actions

export default competitorsSlice
