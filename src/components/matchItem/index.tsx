import Tournament from "@/models/Tournament"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import NonImage from "/assets/utils/nonuserimage.jpg"
import Match from "@/models/Match"
import { useAppDispatch } from "@/hooks/redux"
import { defineWinnerMatch } from "@/store/actions/matchAction"
import { calculateEloRating } from "@/utils/elo_calc"

type Props = {
  tournament: Tournament
  match: Match
  refreshWinner: () => void
}

const MatchItem = ({ match, tournament, refreshWinner }: Props) => {
  const dispatch = useAppDispatch()
  const defineWinner = (winner: number) => {
    const rating = calculateEloRating(
      match.first_competitor.id,
      match.second_competitor.id,
      match.first_competitor.elo_rating,
      match.second_competitor.elo_rating,
      winner,
      match.first_competitor.kFactor,
      match.second_competitor.kFactor,
      1.0
    )
    if (match && !match.winner) {
      dispatch(defineWinnerMatch(match.id, winner, rating[0], rating[1])).then(
        (res) => {
          console.log(res)
          refreshWinner()
        }
      )
    }
  }

  return (
    <div className="my-2 rounded-xl border-[0.1px] border-gray-200 bg-lightblue-100 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div
          onClick={() => defineWinner(match.first_competitor.id)}
          className={`h-full w-[48%] cursor-pointer rounded-xl ${
            match.winner === match.first_competitor.id
              ? "bg-secondary-400"
              : "bg-white"
          } rounded-r-none  px-4 py-2 transition hover:bg-green-400`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="h-full">
              <div className="text-lg font-bold text-gray-600">
                {match.first_competitor_start_rating}
              </div>
              <div className="text-sm font-medium text-gray-600">
                {match.first_competitor_result_rating -
                  match.first_competitor_start_rating >
                0
                  ? "+"
                  : "-"}
                {Math.abs(
                  match.first_competitor_result_rating -
                    match.first_competitor_start_rating
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <img
                  className="h-[60px] w-[60px] rounded-full border-[0.5px] border-gray-200"
                  alt={"image.jpg"}
                  src={match.first_competitor.image?.toString()}
                />
              </div>
              <div>
                <div className="font-semibold text-gray-600">
                  {getCompetitorFullname(match.first_competitor)}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    {match.first_competitor.city}
                  </div>
                  <div className="font-semibold text-green-600">
                    {match.first_competitor.id == match.winner && "WIN"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-4xl font-black text-gray-600">VS</div>
        <div
          onClick={() => defineWinner(match.second_competitor.id)}
          className={`h-full w-[48%] cursor-pointer rounded-xl rounded-l-none ${
            match.winner === match.second_competitor.id
              ? "bg-secondary-400"
              : "bg-white"
          } px-4  py-2 transition hover:bg-green-400`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center   gap-2">
              <div>
                <img
                  className="h-[60px] w-[60px] rounded-full border-[0.5px] border-gray-200"
                  alt={"image.jpg"}
                  src={match.second_competitor.image?.toString()}
                />
              </div>
              <div>
                <div className="font-semibold text-gray-600">
                  {getCompetitorFullname(match.second_competitor)}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    {match.second_competitor.city}
                  </div>
                  <div className="font-semibold text-green-600">
                    {match.second_competitor.id == match.winner && "WIN"}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full">
              <div className="text-lg font-bold text-gray-600">
                {match.second_competitor_start_rating}
              </div>
              <div className="text-sm font-medium text-gray-600">
                {match.second_competitor_result_rating -
                  match.second_competitor_start_rating >
                0
                  ? "+"
                  : "-"}
                {Math.abs(
                  match.second_competitor_result_rating -
                    match.second_competitor_start_rating
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchItem
