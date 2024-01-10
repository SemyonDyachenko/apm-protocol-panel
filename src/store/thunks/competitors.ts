import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "@/api/api"

export const fetchCompetitors = createAsyncThunk(
  "competitors/fetchCompetitors",
  async () => {
    const response = API.getCompetitors()
    return response
  }
)
