import ReturnLine from "@/components/returnLine"
import { tournamentAPI } from "@/services/tournamentsService"
import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import NonImage from "/assets/utils/nonuserimage.jpg"
import { getCompetitorFullname } from "@/models/Competitor"
import { getRoleString } from "@/utils/string"
import ActionButton from "@/components/UI/ActionButton"
import UpMenu, { upMenuItem } from "@/components/upMenu"
import RegistrationWindow from "./registration"

type Props = {}

const items: Array<upMenuItem> = [
  {
    title: "Регистрация",
    target: "registration",
    selected: true,
  },
  {
    title: "Информация",
    target: "info",
  },
  {
    title: "Характеристики",
    target: "stats",
  },
]

const CompetitorEditing = (props: Props) => {
  const { registrationId } = useParams()
  const { data: competitor } = tournamentAPI.useFetchRegistrationQuery(
    parseInt(registrationId || "")
  )
  const [target, setTarget] = useState("registration")

  const getWindow = () => {
    if (competitor) {
      switch (target) {
        case "registration":
          return <RegistrationWindow competitor={competitor[0]} />
      }
    }
  }

  if (competitor)
    return (
      <div className="w-full">
        <div className="w-full rounded-2xl bg-white px-10 py-5">
          <div>
            <ReturnLine className="py-4" />
          </div>
          <div className="my-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <img
                  className="h-[65px] w-[65px] rounded-full"
                  src={competitor[0].competitor?.image?.toString() || NonImage}
                />
              </div>
              <div>
                <div className="text-3xl font-semibold text-lightblue-200">
                  {getCompetitorFullname(competitor[0].competitor)}
                </div>
                <div className="my-1 text-sm text-gray-400">
                  {getRoleString(competitor[0].competitor.mode)}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                to={`https://apm-league.ru/competitor/${competitor[0].competitor.id}`}
              >
                <ActionButton
                  className="rounded-xl px-8 py-3 font-semibold text-gray-600"
                  onClick={() => {}}
                >
                  Карточка спортсмена
                </ActionButton>
              </Link>
            </div>
          </div>
          <div className="mt-8 px-2">
            <UpMenu changeTarget={setTarget} items={items} />
          </div>
          <div className="mt-8">{getWindow()}</div>
        </div>
      </div>
    )
  else return <div></div>
}

export default CompetitorEditing
