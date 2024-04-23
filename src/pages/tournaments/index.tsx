import Loader from "@/components/loader"
import { useAppSelector } from "@/hooks/redux"
import { tournamentAPI } from "@/services/tournamentsService"

import TournamentFrame from "./tournamentFrame"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import Popup from "@/components/popup"
import CustomInput from "@/components/UI/CustomInput"
import ActionButton from "@/components/UI/ActionButton"
import CustomSelect from "@/components/UI/CustomSelect"

type Props = {}

const TournamentsPage = (props: Props) => {
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )

  const [creationWindow, openCreationWindow] = useState(false)
  const [tournamentName, setTournamentName] = useState("")

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
            <div
              onClick={() => openCreationWindow(true)}
              className="h-[200px] w-5/12  rounded-2xl bg-lightblue-100 bg-opacity-50 shadow-sm transition hover:bg-white hover:bg-opacity-50 md:w-[300px]"
            >
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
        <Popup
          className="absolute left-[40%] top-[10%] w-[400px] rounded-lg  border-[1px] bg-white pb-8 shadow-sm"
          active={creationWindow}
          closeFunc={() => openCreationWindow(false)}
        >
          <div className="px-6">
            <div className="flex w-full cursor-pointer justify-end py-4">
              <FontAwesomeIcon
                onClick={() => openCreationWindow(false)}
                className="text-xl text-gray-400 "
                icon={faClose}
              />
            </div>
            <div className="text-center text-xl font-medium text-gray-600">
              <h2>Создание турнира</h2>
            </div>
            <div className="mt-4">
              <div>
                <div className="py-1 text-sm text-lightblue-200">Название:</div>
                <div>
                  <CustomInput
                    className="w-full rounded-md border-lightblue-200 bg-lightblue-100 py-2"
                    value={tournamentName}
                    onChange={setTournamentName}
                    type={"text"}
                  />
                </div>
              </div>

              <div className="mt-2">
                <div className="py-1 text-sm text-lightblue-200">Лига:</div>
                <div></div>
              </div>

              <div className="mt-6">
                <ActionButton
                  className="w-full py-3 font-medium text-gray-700"
                  onClick={() => {}}
                >
                  Создать турнир
                </ActionButton>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    )
  else return <div></div>
}

export default TournamentsPage
