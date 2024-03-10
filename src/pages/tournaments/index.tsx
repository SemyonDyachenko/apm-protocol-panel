import Loader from "@/components/loader"
import { useAppSelector } from "@/hooks/redux"
import { tournamentAPI } from "@/services/tournamentsService"

import TournamentFrame from "./tournamentFrame"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

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
            <div className="h-[200px] w-5/12  rounded-2xl bg-lightblue-100 bg-opacity-50 shadow-sm transition hover:bg-white hover:bg-opacity-50 md:w-[300px]">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-lightblue-200 transition hover:text-secondary-500">
                <FontAwesomeIcon className="text-3xl" icon={faPlus} />
              </div>
            </div>
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
