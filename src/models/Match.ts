import Competitor from "@/models/Competitor"
import WeightClass from "@/models/WeightClass"

export default interface Match {
  id: number
  hand: string
  tournament: number
  first_competitor: Competitor
  second_competitor: Competitor
  first_competitor_start_rating: number
  second_competitor_start_rating: number
  first_competitor_result_rating: number
  second_competitor_result_rating: number
  winner?: number
  weight_class: WeightClass
  date: string
  round: number
  category: string
}
