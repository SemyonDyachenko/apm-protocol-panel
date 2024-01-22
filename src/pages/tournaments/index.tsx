import Loader from "@/components/loader"
import { useAppSelector } from "@/hooks/redux"
import { tournamentAPI } from "@/services/tournamentsService"

import TournamentFrame from "./tournamentFrame"

type Props = {}

const TournamentsPage = (props: Props) => {
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )

  const { data: tournaments, isLoading } =
    tournamentAPI.useFetchOrganizedTournamentsQuery(competitor?.id || -1)

  if (loading || isLoading) return <Loader />
  if (competitor && tournaments)
    return (
      <div className="w-full md:w-10/12">
        <div>
          <div className="my-8 text-3xl font-semibold text-lightblue-200">
            Актуальные турниры
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full gap-4 rounded-2xl py-5">
            {tournaments
              .filter(
                (item) => new Date(item.date).getTime() > new Date().getTime()
              )
              .filter((item) => item.active)
              .map((item, index) => (
                <TournamentFrame key={index} tournament={item} />
              ))}
          </div>
        </div>
        <div>
          <div className="my-8 text-3xl font-semibold text-lightblue-200">
            Завершенные турниры
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full flex-wrap gap-4 rounded-2xl py-5">
            {tournaments
              .filter(
                (item) => new Date(item.date).getTime() < new Date().getTime()
              )
              .map((item, index) => (
                <TournamentFrame key={index + item.id} tournament={item} />
              ))}
          </div>
        </div>
      </div>
    )
  else return <div></div>
}

export default TournamentsPage
