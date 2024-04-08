import { useNavigate, useParams } from "react-router-dom"
import { tournamentAPI } from "@/services/tournamentsService"
import React, { useCallback, useEffect, useRef, useState } from "react"
import ReturnLine from "@/components/returnLine"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import NonImage from "/assets/utils/nonuserimage.jpg"
import { getNormalizeDate } from "@/utils/date"
import ActionButton from "@/components/UI/ActionButton"
import { getTournamentEnded } from "@/models/Tournament"
import ManualSystem from "@/pages/system/manual"
import AutomaticSystem from "@/pages/system/automatic"
import { weightClassAPI } from "@/services/weightClassService"

type Props = {}

const TournamentSystem = (props: Props) => {
  const navigate = useNavigate()
  const { tournamentId } = useParams()
  const { data: tournament } = tournamentAPI.useFetchTournamentQuery(
    parseInt(tournamentId || "")
  )

  const { data: competitors } =
    tournamentAPI.useFetchTournamentRegistrationQuery(
      tournament ? tournament.id : -1
    )
  const { data: classes } = weightClassAPI.useFetchTournamentClassesQuery(
    tournament ? tournament.id : -1
  )

  const [unsavedData, setUnsavedData] = useState(true)

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (unsavedData) {
        event.preventDefault()
        event.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [unsavedData])

  const handlePopstate = (event: any) => {
    const confirmLeave = window.confirm(
      "Вы уверены, что хотите покинуть страницу? Все несохраненные данные будут потеряны."
    )
    if (!confirmLeave) {
      // Если пользователь отменил покидание страницы, восстанавливаем текущий путь в истории
      navigate(1)
    }
  }

  useEffect(() => {
    window.addEventListener("popstate", handlePopstate)

    return () => {
      window.removeEventListener("popstate", handlePopstate)
    }
  }, [])
  const handleSaveData = () => {
    setUnsavedData(false)
  }
  const handleChangeData = () => {
    setUnsavedData(true)
  }

  useEffect(() => {
    if (tournament && !tournament.is_started) {
      // Если турнир загружен и не начался, перенаправляем на главную страницу
      navigate(`/tournament/${tournamentId}`)
    }
  }, [tournament])

  const getTournamentSystem = () => {
    if (tournament && classes && competitors)
      switch (tournament.mode) {
        case "manual":
          return (
            <ManualSystem
              tournament={tournament}
              classes={classes}
              competitors={competitors}
            />
          )
        case "automatic":
          return (
            <AutomaticSystem
              tournament={tournament}
              classes={classes}
              competitors={competitors}
            />
          )
      }
  }

  if (tournament && tournament.is_started && classes && competitors)
    return (
      <div>
        <div className="w-full rounded-2xl bg-white px-10 py-5">
          <div>
            <ReturnLine className="py-4" />
          </div>
          <div className="my-4 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <div className=" h-[65px] w-[65px]">
                <div
                  onClick={() =>
                    window.location.replace(
                      `https://apm-league.ru/tournament/editing/${tournament.id}`
                    )
                  }
                  className="absolute cursor-pointer rounded-full bg-black text-2xl text-white opacity-0 transition hover:opacity-50"
                >
                  <div className="flex h-[65px] w-[65px] items-center justify-center">
                    <FontAwesomeIcon icon={faCamera} />
                  </div>
                </div>
                <img
                  alt="logo.jpg"
                  className="h-[65px] w-[65px] rounded-full"
                  src={tournament.logo ? tournament.logo.toString() : NonImage}
                />
              </div>
              <div>
                <div className="text-3xl font-semibold text-lightblue-200">
                  {tournament.name}
                </div>
                <div className="my-1 text-sm text-gray-400">
                  {getNormalizeDate(tournament.date)}
                </div>
              </div>
            </div>
            <div>
              <ActionButton
                disabled={getTournamentEnded(tournament)}
                className="px-8 py-3 font-semibold text-gray-600 disabled:bg-gray-300"
                onClick={() => {}}
              >
                Завершить турнир
              </ActionButton>
            </div>
          </div>
          <div className="my-4 h-[1px] w-full bg-gray-200 px-4"></div>
          <div>
            <ManualSystem
              tournament={tournament}
              classes={classes}
              competitors={competitors}
            />
          </div>
        </div>
      </div>
    )
  return <div></div>
}

export default TournamentSystem
