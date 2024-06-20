import Loader from "@/components/loader"
import ReturnLine from "@/components/returnLine"
import UpMenu, { upMenuItem } from "@/components/upMenu"
import { tournamentAPI } from "@/services/tournamentsService"
import { getNormalizeDate } from "@/utils/date"
import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CompetitorsSection from "../competitors"
import ActionButton from "@/components/UI/ActionButton"
import NonImage from "/assets/utils/nonuserimage.jpg"
import CategoryWindow from "./categories"
import InformationWindow from "./info"
import { leagueAPI } from "@/services/leaugeService"
import CompetitorAdder from "@/components/competitorAdder"
import TournamentDocsPage from "./docs"
import TournamentLeaguePage from "./league"
import { competitorAPI } from "@/services/competitorService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons"
import { getTournamentEnded } from "@/models/Tournament"
import TournamentStartPopup from "@/pages/tournament/startPopup"
import { useAppSelector } from "@/hooks/redux"

type Props = {}

const items: Array<upMenuItem> = [
  {
    title: "Участники",
    target: "competitors",
    selected: true,
  },
  {
    title: "Категории",
    target: "categories",
  },
  {
    title: "Информация",
    target: "info",
  },
  {
    title: "Правила",
    target: "docs",
  },
  {
    title: "Лига",
    target: "league",
  },
]

const TournamentPage = (props: Props) => {
  const navigate = useNavigate()
  const { tournamentId } = useParams()
  const { data: tournament, isLoading } = tournamentAPI.useFetchTournamentQuery(
    parseInt(tournamentId || "")
  )
  const { data: league } = leagueAPI.useFetchLeagueQuery(
    tournament?.league || -1
  )
  const { data: competitors, refetch } =
    tournamentAPI.useFetchTournamentRegistrationQuery(tournament?.id || -1)

  const [target, setTarget] = useState("competitors")
  const [adder, setAdder] = useState(false)
  const [startWindow, setStartWindow] = useState(false)

  const { competitor } = useAppSelector((state) => state.competitors)

  const getWindow = () => {
    if (tournament) {
      switch (target) {
        case "competitors":
          return (
            competitors && (
              <CompetitorsSection
                action={() => setAdder(!adder)}
                competitors={competitors}
              />
            )
          )
        case "categories":
          return (
            competitors && (
              <CategoryWindow
                competitors={competitors}
                tournament={tournament}
              />
            )
          )
        case "info":
          return (
            league && (
              <InformationWindow league={league} tournament={tournament} />
            )
          )
        case "docs":
          return <TournamentDocsPage />
        case "league":
          return league && <TournamentLeaguePage league={league} />
      }
    }
  }

  if (isLoading) return <Loader />
  if (tournament && competitor && competitor.id === tournament.organizer)
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
                  className="z-[1] h-[65px] w-[65px] rounded-full"
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
                className="px-8 py-3 font-semibold text-gray-600 disabled:bg-gray-300"
                onClick={() => {
                  if (!tournament.is_started) setStartWindow(true)
                  else navigate(`/tournament/system/${tournament.id}`)
                }}
              >
                {tournament.is_started ? "Система протоколов" : `Начать турнир`}
              </ActionButton>
            </div>
          </div>
          <div className="mt-8 px-2">
            <UpMenu items={items} changeTarget={setTarget} />
          </div>
          <div className="my-8">{getWindow()}</div>
        </div>
        <CompetitorAdder
          tournament={tournament}
          active={adder}
          closeFunc={() => setAdder(false)}
        />
        <TournamentStartPopup
          tournament={tournament}
          active={startWindow}
          closeFunc={() => setStartWindow(false)}
        />
      </div>
    )
  else return <div></div>
}

export default TournamentPage
