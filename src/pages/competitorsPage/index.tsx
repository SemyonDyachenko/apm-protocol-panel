import React, { useState } from "react"
import CompetitorsSection from "../competitors"
import ActionButton from "@/components/UI/ActionButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { competitorAPI } from "@/services/competitorService"
import { getCompetitorFullname } from "@/models/Competitor"
import CompetitorNode from "../competitors/competitorNode"
import CompetitorsNode from "@/components/competitorNode"
import ReturnLine from "@/components/returnLine"

type Props = {}

const CompetitorsPage = (props: Props) => {
  const [searchString, setSearchString] = useState("")
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)

  return (
    <div className="w-full ">
      <div className="w-full rounded-2xl bg-white p-10">
        <div>
          <ReturnLine className="" />
        </div>
        <div>
          <div className="my-8 text-3xl font-semibold text-lightblue-200">
            Рейтинг спортсменов
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="w-11/12">
              <input
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                type="text"
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-gray-400 outline-none transition focus:border-lightblue-200 focus:text-lightblue-200"
                placeholder="Поиск спортсмена"
              />
            </div>
            <div>
              <ActionButton
                className="flex items-center gap-2 px-[25px] py-[10px] font-medium text-gray-600"
                onClick={() => {}}
              >
                <div>Добавить</div>
                <FontAwesomeIcon className="text-sm" icon={faUserPlus} />
              </ActionButton>
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-full justify-between text-sm font-medium text-gray-400">
          <div className="flex w-1/6 items-center gap-2 px-4">
            <div className="cursor-pointer">Участник</div>
          </div>
          <div>Пол</div>
          <div>Город</div>
          <div>Дата рождения</div>
          <div>Вес</div>
          <div>Роль</div>
          <div>Рейтинг</div>
        </div>
        <div className="mb-4 mt-6 h-[1px] w-full bg-gray-200"></div>
        <div className="w-full">
          {competitors
            ?.filter((item) =>
              getCompetitorFullname(item)
                ?.trim()
                .toLowerCase()
                .includes(searchString.trim().toLowerCase())
            )
            .map((item, index) => (
              <CompetitorsNode key={index} competitor={item} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default CompetitorsPage
