import Competitor from "./Competitor"
import Tournament from "./Tournament"

export default interface Notification {
  id: number
  competitor: Competitor
  message: String
  datetime: Date
  read: boolean
}

export interface TournamentNotification extends Notification {
  tournament: Tournament
}
