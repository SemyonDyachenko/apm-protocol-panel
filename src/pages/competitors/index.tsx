import ActionButton from "@/components/UI/ActionButton"
import Checkbox from "@/components/UI/Checkbox"
import { getCompetitorFullname } from "@/models/Competitor"
import { competitorAPI } from "@/services/competitorService"
import { getRoleString } from "@/utils/string"
import {
  faAdd,
  faEllipsisVertical,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"

type Props = {}

const CompetitorsSection = (props: Props) => {
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  const [searchString, setSearchString] = useState("")
  const [selectAll, setSelectAll] = useState(false)

  return (
    <div className="w-10/12">
      <div>
        <div>
          <div className="my-8 text-3xl font-medium text-lightblue-200">
            Участники турнира
          </div>
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="w-11/12">
              <input
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                type="text"
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-gray-400 outline-none"
                placeholder="Поиск спортсмена"
              />
            </div>
            <div>
              <ActionButton
                className="flex items-center gap-2 px-12 font-medium text-white"
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faUserEdit} />
                <div>Добавить</div>
              </ActionButton>
            </div>
          </div>
        </div>
        <div className="w-full rounded-xl bg-white p-10">
          <div className="flex w-full justify-between text-sm font-medium text-gray-400">
            <div className="flex w-1/6 items-center gap-2">
              <Checkbox
                className="mt-1"
                isChecked={selectAll}
                changeState={setSelectAll}
              />
              <div>Участник</div>
            </div>
            <div>Статус</div>
            <div>Страна</div>
            <div>Роль</div>
            <div>Город</div>
            <div>Рейтинг</div>
          </div>
          <div className="mb-4 mt-6 h-[1px] w-full bg-gray-200"></div>
          <div className="w-full">
            {competitors
              ?.filter((item) =>
                getCompetitorFullname(item)
                  ?.toLowerCase()
                  .trim()
                  .includes(searchString.toLowerCase().trim())
              )
              .map((item, index) => (
                <div
                  className="mt-8 flex w-full items-center justify-between"
                  key={index}
                >
                  <div className="">
                    <Checkbox
                      className="mt-2"
                      isChecked={false}
                      changeState={() => {}}
                    />
                  </div>
                  <div className="w-1/4 font-medium">
                    {getCompetitorFullname(item)}
                  </div>
                  <div className="w-1/6 text-sm text-gray-400">
                    {item.verified ? "Подтвержден" : "Не подтвержден"}
                  </div>
                  <div className="w-1/6 text-sm text-gray-400">
                    {item.country}
                  </div>
                  <div className="w-1/6  text-sm text-gray-400">
                    {getRoleString(item.mode)}
                  </div>
                  <div className=" w-1/12 text-sm text-gray-400">
                    {item.city}
                  </div>
                  <div className="w-1/12 pl-10 text-center text-sm text-secondary-500">
                    {item.elo_rating}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitorsSection
