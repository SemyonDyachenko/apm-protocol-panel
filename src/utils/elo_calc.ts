import Competitor from "@/models/Competitor"
import { TournamentRegistration } from "@/models/Tournament"

export const calculateEloRating = (
  competitor1: number,
  competitor2: number,
  rating1: number,
  rating2: number,
  winner: number,
  competitor1KFactor: number,
  competitor2KFactor: number,
  tournamentCoefficient: number
) => {
  let outcome = winner === competitor1 ? 1 : 0
  let expectedPlayerScore = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400))
  let expectedOpponentScore = 1 - expectedPlayerScore
  console.log(expectedPlayerScore)
  let updatedPlayerRating =
    rating1 +
    competitor1KFactor * tournamentCoefficient * (outcome - expectedPlayerScore)
  console.log(updatedPlayerRating)
  let updatedOpponentRating =
    rating2 +
    competitor2KFactor *
      tournamentCoefficient *
      (1 - outcome - expectedOpponentScore)
  console.log(updatedOpponentRating)
  return [Math.round(updatedPlayerRating), Math.round(updatedOpponentRating)]
}
