import React, { useState } from "react"
import Popup from "../popup"
import { Link } from "react-router-dom"
import Competitor, {
  getCompetitorFullname,
  getCompetitorGender,
} from "@/models/Competitor"
import { getNormalizeDate } from "@/utils/date"
import { getRoleString } from "@/utils/string"

type Props = {
  competitor: Competitor
}

const CompetitorsNode = ({ competitor }: Props) => {
  return (
    <div>
      <div
        className={`competitors-center my-2 flex w-full cursor-pointer justify-between px-4 py-4 transition hover:rounded-lg hover:bg-gray-80 `}
      >
        <div className="w-1/3 font-medium text-gray-600">
          {getCompetitorFullname(competitor)}
        </div>
        <div className=" w-1/6 text-sm text-gray-400">
          {getCompetitorGender(competitor)}
        </div>
        <div className="w-1/6 pl-5 text-sm text-gray-400">
          {competitor.city?.valueOf() || "Не указан"}
        </div>
        <div className="w-1/6 pl-5 text-sm text-gray-400">
          {competitor.birthdate
            ? getNormalizeDate(competitor.birthdate.toString())
            : "Не указана"}
        </div>
        <div className="w-1/5  text-sm text-gray-400">
          {competitor.weight !== 0 ? competitor.weight + " Кг" : "Не указан"}
        </div>
        <div className=" w-1/12 text-sm text-gray-400">
          {getRoleString(competitor.mode)}
        </div>
        <div className="w-1/12 pl-10 text-end text-sm text-secondary-500">
          {competitor.elo_rating}
        </div>
      </div>
    </div>
  )
}

export default CompetitorsNode
