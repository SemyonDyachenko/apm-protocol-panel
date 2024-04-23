import { getCompetitorFullname } from "@/models/Competitor"
import League, { getLeagueLevel } from "@/models/League"

import { competitorAPI } from "@/services/competitorService"
import { getNormalizeDate } from "@/utils/date"
import React from "react"
import { Link } from "react-router-dom"

type Props = {
  league: League
}

const TournamentLeaguePage = ({ league }: Props) => {
  const { data: president } = competitorAPI.useFetchCompetitorDataQuery(
    +league.president
  )
  return (
    <div className="w-10/12 px-4">
      <div>
        <div className="my-1 text-sm text-gray-400">Описание:</div>
        <div className="text-sm font-medium text-gray-600">
          {league.description}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-10">
        <div>
          <div className="my-1 text-sm text-gray-400">Президент:</div>
          <div className="text-gray-600">
            <Link
              className="text-sm text-secondary-500 underline"
              to={`/competitor/${president?.id}`}
            >
              {getCompetitorFullname(president)}
            </Link>
          </div>
        </div>
        <div>
          <div className="my-1 text-sm text-gray-400">Дата создания:</div>

          <div className="text-sm font-medium text-gray-600">
            {getNormalizeDate(league.creation_date?.toString() || "Не указана")}
          </div>
        </div>
        <div>
          <div className="my-1 text-sm text-gray-400">Статус:</div>

          <div className="text-sm font-medium text-gray-600">
            {getLeagueLevel(league)}
          </div>
        </div>
        <div>
          <div className="my-1 text-sm text-gray-400">Статус:</div>

          <div className="text-sm font-medium text-gray-600">
            {league.country}
          </div>
        </div>
        <div>
          <div className="my-1 text-sm text-gray-400">Почта:</div>

          <div className="text-sm font-medium text-gray-600">
            {league.email}
          </div>
        </div>
        <div>
          <div className="my-1 text-sm text-gray-400">Телефон:</div>

          <div className="text-sm font-medium text-gray-600">
            {league.phone}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentLeaguePage
