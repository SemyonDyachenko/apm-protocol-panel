import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit"
import competitorReducer from "./slices/competitorSlice"
import { competitorAPI } from "@/services/competitorService"
import { matchAPI } from "@/services/matchService"
import { leagueAPI } from "@/services/leaugeService"
import authSlice from "./slices/authSlice"
import { tournamentAPI } from "@/services/tournamentsService"
import { weightClassAPI } from "@/services/weightClassService"
import { reviewAPI } from "@/services/reviewService"
import rolesSlice from "./slices/roleSlice"
import { notificationAPI } from "@/services/tournamentService"
import { teamAPI } from "@/services/teamService"

const rootReducer = combineReducers({
  competitors: competitorReducer.reducer,
  auth: authSlice.reducer,
  roles: rolesSlice.reducer,
  [weightClassAPI.reducerPath]: weightClassAPI.reducer,
  [competitorAPI.reducerPath]: competitorAPI.reducer,
  [matchAPI.reducerPath]: matchAPI.reducer,
  [leagueAPI.reducerPath]: leagueAPI.reducer,
  [tournamentAPI.reducerPath]: tournamentAPI.reducer,
  [reviewAPI.reducerPath]: reviewAPI.reducer,
  [notificationAPI.reducerPath]: notificationAPI.reducer,
  [teamAPI.reducerPath]: teamAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        competitorAPI.middleware,
        leagueAPI.middleware,
        matchAPI.middleware,
        tournamentAPI.middleware,
        weightClassAPI.middleware,
        reviewAPI.middleware,
        notificationAPI.middleware,
        teamAPI.middleware,
      ]),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
