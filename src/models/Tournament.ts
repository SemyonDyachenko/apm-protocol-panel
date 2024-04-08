import Competitor from "./Competitor"
import League from "./League"
import WeightClass from "./WeightClass"
import { getNormalizeDate } from "@/utils/date"

export default interface Tournament {
  id: number
  name: string
  location: string
  description: string
  banner: File
  logo: File
  avg_rating: number
  address: string
  organizer: number
  main_secretary: number
  main_referee: number
  date: string
  league: number
  is_started: boolean
  level: string
  phone: string
  active: boolean
  mode: string
  afisha?: File
}

export interface TournamentRegistration {
  id: number
  tournament: number
  competitor: Competitor
  weight_class: WeightClass
  registration_date: string
  category: string
  confirm: boolean
  weight: number
  paid: boolean
  hand: string
}

export const getTournamentLevel = (tournament: Tournament) => {
  return tournament.level.toLocaleLowerCase() === "pro"
    ? "Профессиональный"
    : "Любительский"
}

export const getTournamentEnded = (tournament: Tournament) => {
  return new Date(tournament.date).getTime() <= new Date().getTime()
}
