import React, { useState } from "react"
import ActionButton from "../UI/ActionButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import Tournament from "@/models/Tournament"
import { weightClassAPI } from "@/services/weightClassService"
import { competitorAPI } from "@/services/competitorService"
import NonImage from "/assets/utils/nonuserimage.jpg"

import Popup from "../popup"
import { tournamentCategories } from "@/utils/string"
import { useAppDispatch } from "@/hooks/redux"
import { registerForTournament } from "@/store/actions/tournamentAction"

type Props = {
  active: boolean
  tournament: Tournament
  closeFunc: () => void
}

const CompetitorAdder = ({ active, closeFunc, tournament }: Props) => {
  const dispatch = useAppDispatch()
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  const { data: classes } = weightClassAPI.useFetchTournamentClassesQuery(
    tournament.id
  )

  const [search, setSearch] = useState("")

  const [selectedCompetitor, setSelectedCompetitor] =
    useState<Competitor | null>(null)
  const [category, setCategory] = useState("men")
  const [weightClass, setWeightClass] = useState(-1)

  const registerCompetitor = () => {
    if (selectedCompetitor && category && weightClass !== -1) {
      dispatch(
        registerForTournament({
          competitor: selectedCompetitor.id,
          tournament: tournament.id,
          weight_class: weightClass,
          category: category,
        })
      ).then((res) => {
        if (res) {
          if (res.status !== 400) {
            window.location.reload()
          }
        }
      })
    }
  }

  return (
    <Popup
      className="left-1/3 top-10 m-10 w-[450px] rounded-lg border-[1px] bg-white pb-5 shadow-md"
      active={active}
      closeFunc={closeFunc}
    >
      <div className="w-full px-5">
        <div className="flex items-center justify-end py-4">
          <FontAwesomeIcon
            onClick={closeFunc}
            className="cursor-pointer text-lg  text-gray-400"
            icon={faClose}
          />
        </div>
        <div className="w-full text-center text-xl font-medium text-gray-600">
          Добавьте спортсмена
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="my-2 w-full rounded-l-lg border-[1px] border-r-[0px] border-lightblue-200 bg-lightblue-100 px-4 py-2 text-lightblue-200 outline-none placeholder:text-lightblue-200"
            placeholder="Поиск"
          />
          <div className="rounded-r-lg border-b-[1px] border-r-[1px] border-t-[1px] border-lightblue-200 bg-lightblue-100 px-4 py-2 text-lightblue-200">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        {selectedCompetitor && (
          <div className="mt-2">
            <div
              onClick={() => setSelectedCompetitor(null)}
              className="my-2 flex cursor-pointer items-center justify-between rounded-lg border-[1px] bg-gray-70 px-4 py-2 transition hover:bg-gray-80"
            >
              <div className="flex  items-center gap-2">
                <div>
                  <img
                    className="h-[45px] w-[45px] rounded-full  border-gray-300"
                    src={
                      selectedCompetitor.image
                        ? selectedCompetitor.image.toString()
                        : NonImage
                    }
                  />
                </div>
                <div className="text-md font-medium text-lightblue-200">
                  {getCompetitorFullname(selectedCompetitor)}
                </div>
              </div>
              <div className="font-medium text-secondary-500">
                {selectedCompetitor.elo_rating}
              </div>
            </div>
          </div>
        )}
        {!selectedCompetitor && (
          <div className="mt-2 overflow-y-scroll md:max-h-[250px] ">
            {competitors
              ?.filter((item) =>
                getCompetitorFullname(item)
                  ?.trim()
                  .toLowerCase()
                  .includes(search.trim().toLowerCase())
              )
              .map((item, index) => (
                <div
                  onClick={() => setSelectedCompetitor(item)}
                  className="my-2 mr-2  flex cursor-pointer items-center justify-between rounded-lg border-[1px] px-4 py-2 transition hover:bg-gray-80"
                  key={index}
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <img
                        className="h-[45px] w-[45px] rounded-full  border-gray-300"
                        src={item.image ? item.image.toString() : NonImage}
                      />
                    </div>
                    <div className="text-md font-medium text-lightblue-200">
                      {getCompetitorFullname(item)}
                    </div>
                  </div>
                  <div className="font-medium text-secondary-500">
                    {item.elo_rating}
                  </div>
                </div>
              ))}
          </div>
        )}
        <div className="mt-4">
          <div className="mb-1 text-sm text-lightblue-200">Категория:</div>
          <div>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border-[1px] border-t-[1px] border-lightblue-200 bg-lightblue-100 px-4 py-2 text-lightblue-200 outline-none"
            >
              <option value="">Нет</option>
              {tournamentCategories
                .filter((item) =>
                  selectedCompetitor?.gender === "m"
                    ? item.value !== "women"
                    : item.value !== "men"
                )
                .map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-1 text-sm text-lightblue-200">
            Весовая категория:
          </div>
          <div>
            <select
              onChange={(e) => setWeightClass(+e.target.value)}
              className="w-full rounded-lg border-[1px] border-t-[1px] border-lightblue-200 bg-lightblue-100 px-4 py-2 text-lightblue-200 outline-none"
            >
              <option>Нет</option>
              {classes
                ?.filter((item) => item.category === category)
                .map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.weight_class.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <ActionButton
            disabled={weightClass === -1 || !category || !selectedCompetitor}
            className="w-full py-3 font-semibold text-gray-600 disabled:bg-gray-400"
            onClick={registerCompetitor}
          >
            Добавить
          </ActionButton>
        </div>
      </div>
    </Popup>
  )
}

export default CompetitorAdder
