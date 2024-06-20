import { getCompetitorFullname } from "@/models/Competitor"
import Match from "@/models/Match"
import Tournament from "@/models/Tournament"
import { getCategoryString, tournamentCategories } from "@/utils/string"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import CustomSelect from "../UI/CustomSelect"
import { TournamentWeightClass } from "@/models/WeightClass"
import ModalWindow from "../modals/modalWindow"

type Props = {
  tournament: Tournament
  matches: Match[]
  closeFunc: () => void
  hidden: boolean
  weightClasses: TournamentWeightClass[]
}

const MatchesTable = ({
  tournament,
  matches,
  hidden,
  closeFunc,
  weightClasses,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("men")
  const [selectedHand, setSelectedHand] = useState("left")
  const [selectedWeightClass, setSelectedWeightClass] = useState(-1)
  return (
    <ModalWindow hidden={hidden} closeFunc={closeFunc} title="Поединки турнира">
      <div className="mt-4 flex items-center justify-between gap-x-4 px-10">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="text-sm text-gray-400">Категория:</div>
            <CustomSelect
              className="my-1 py-[3px]"
              value={selectedCategory}
              setValue={setSelectedCategory}
            >
              {tournamentCategories.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.title}
                </option>
              ))}
            </CustomSelect>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="text-sm text-gray-400">Вес. Категория:</div>
            <CustomSelect
              className="my-1 py-[3px]"
              value={selectedWeightClass}
              setValue={setSelectedWeightClass}
            >
              <option value={-1}>Нет</option>
              {weightClasses
                .filter((item) => item.category == selectedCategory)
                .map((item, index) => (
                  <option key={index} value={item.weight_class.id}>
                    {item.weight_class.name} Кг
                  </option>
                ))}
            </CustomSelect>
          </div>
        </div>
        <div>
          <div className="flex rounded-full border-[1px] bg-gray-70 p-[4px]">
            <div
              onClick={() => setSelectedHand("left")}
              className={`cursor-pointer rounded-full font-medium text-gray-400 transition ${
                selectedHand === "left" && "bg-gray-200 text-gray-600"
              } px-6`}
            >
              Левая
            </div>

            <div
              onClick={() => setSelectedHand("right")}
              className={`cursor-pointer rounded-full font-medium text-gray-400 transition ${
                selectedHand === "right" && "bg-gray-200 text-gray-600"
              } px-6`}
            >
              Правая
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 px-10">
        <div>
          <div className="w-full rounded-2xl bg-white pb-3 pt-2">
            <div className="flex w-full justify-between text-sm font-medium text-gray-400">
              <div className="w-1/6">
                <div className="cursor-pointer">Участник 1</div>
              </div>
              <div className="w-1/6">Участник 2</div>
              <div className="w-1/6">Победитель</div>
              <div className="w-1/12">Раунд</div>
              <div>Категория</div>
              <div>Рука</div>
              <div>В. Категория</div>
            </div>
          </div>
          <div className="h-[1px] w-auto bg-gray-200"></div>
          <div className="mt-4">
            {matches
              .filter(
                (item) =>
                  item.category == selectedCategory &&
                  item.hand == selectedHand &&
                  item.weight_class.id == selectedWeightClass
              )
              .map((item) => (
                <div className="flex justify-between gap-x-4 py-3 text-gray-600">
                  <div className="w-1/6 text-secondary-500">
                    {getCompetitorFullname(item.first_competitor)}
                  </div>
                  <div className="w-1/6  text-secondary-500">
                    {getCompetitorFullname(item.second_competitor)}
                  </div>
                  <div className="w-1/6  text-green-500">
                    {item.winner &&
                      (item.winner == item.first_competitor.id
                        ? getCompetitorFullname(item.first_competitor)
                        : getCompetitorFullname(item.second_competitor))}
                  </div>
                  <div className="w-1/12 text-center">{item.round}</div>
                  <div className="w-1/12">
                    {getCategoryString(item.category)}
                  </div>
                  <div className="w-1/12">
                    {item.hand == "left" ? "Левая" : "Правая"}
                  </div>
                  <div>{item.weight_class.name} Кг</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </ModalWindow>
  )
}

export default MatchesTable
