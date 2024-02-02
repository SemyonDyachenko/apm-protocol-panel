import Competitor from "./Competitor"

export default interface Team {
  id: number
  name: string
  location: string
  country: string
  phone: string
  email: string
  status: string
  organizer: number
  description: string

  logo?: File
  banner?: File
}

export interface TeamCompetitor {
  id: number
  team: Team
  competitor: Competitor
  status: string
  datetime: Date
}

export const getTeamStatus = (team: Team) => {
  return team.status.toLocaleLowerCase() === "pro"
    ? "Профессиональная"
    : "Любительская"
}
