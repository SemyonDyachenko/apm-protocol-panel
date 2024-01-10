import Competitor from "./Competitor"
import League from "./League"

export default interface LeagueCompetitor {
  id: number
  league: League
  competitor: Competitor
  accepted: boolean
  request_date: Date
  status: string
  role: string
}
