import Competitor from "./Competitor"

interface Review {
  id: number
  text: string
  author: Competitor
  rating: number
  date: Date
}

export interface TournamentReview extends Review {
  tournament: number
}

export interface LeagueReview extends Review {
  league: number
}

export interface AverageRating {
  average_rating: number
}
