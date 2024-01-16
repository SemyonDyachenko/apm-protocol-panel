import Loader from "@/components/loader"
import ReturnLine from "@/components/returnLine"
import UpMenu, { upMenuItem } from "@/components/upMenu"
import { tournamentAPI } from "@/services/tournamentsService"
import { getNormalizeDate } from "@/utils/date"
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import CompetitorsSection from "../competitors"
import ActionButton from "@/components/UI/ActionButton"
import NonImage from "/assets/utils/nonuserimage.jpg"
import CategoryWindow from "./categories"
import InformationWindow from "./info"
import { leagueAPI } from "@/services/leaugeService"
import CompetitorAdder from "@/components/competitorAdder"


type Props = {}

const items: Array<upMenuItem> = [
  {
    title: "Участники",
    target: "competitors",
    selected: true,
  },
  {
    title: "Категории",
    target: "categoires",
  },
  {
    title: "Информация",
    target: "info",
  },
  {
    title: "Правила",
    target: "rules",
  },
  {
    title: "Лига",
    target: "league",
  },
]

const TournamentPage = (props: Props) => {
  const { tournamentId } = useParams()
  const { data: tournament, isLoading } = tournamentAPI.useFetchTournamentQuery(
    parseInt(tournamentId || "")
  )
  const { data: league } = leagueAPI.useFetchLeagueQuery(
    tournament?.league || -1
  )
  const [target, setTarget] = useState("competitors")
  const [adder, setAdder] = useState(false)

  const getWindow = () => {
    if (tournament) {
      switch (target) {
        case "competitors":
          return (
            <CompetitorsSection
              action={() => setAdder(!adder)}
              tournament={tournament}
            />
          )
        case "categoires":
          return <CategoryWindow />
        case "info":
          return (
            league && (
              <InformationWindow league={league} tournament={tournament} />
            )
          )
      }
    }
  }

  if (isLoading) return <Loader />
  if (tournament)
    return (
      <div>
        <div className="w-full rounded-2xl bg-white px-10 py-5 ">
          <div>
            <ReturnLine className="py-4" />
          </div>
          <div className="my-4 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <div className="">
                <img
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
                className="px-8 py-3 font-semibold text-gray-600"
                onClick={() => {}}
              >
                Начать турнир
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
      </div>
    )
  else return <div></div>
}

export default TournamentPage
