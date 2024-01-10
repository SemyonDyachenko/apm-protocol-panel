import Team from "./Team"

export default interface Competitor {
  id: number
  email: string
  first_name: string
  last_name: string
  gender: string
  image: File | null
  elo_rating: number
  kFactor: number
  mode: string
  weight: number
  country?: string
  rank: string
  trainer?: number
  city?: string
  birthdate?: Date
  career_start_date: Date
  height?: number
  description?: string
  grip?: number
  biceps?: number
  crossbar?: number
  shaft?: number
  militarypress?: number
  hand?: number
  press?: number
  side?: number
  verified?: boolean
  team?: Team
}

export interface RatingPosition {
  rating_position: number
}

export const getCompetitorFullname = (
  competitor: Competitor | null | undefined
) => {
  if (competitor) return competitor.first_name + " " + competitor.last_name
  else return null
}

export const getCompetitorGender = (competitor: Competitor) => {
  if (competitor) return competitor.gender === "m" ? "Муж." : "Жен."
  return null
}
