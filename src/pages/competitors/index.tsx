import ActionButton from "@/components/UI/ActionButton"
import Checkbox from "@/components/UI/Checkbox"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import { competitorAPI } from "@/services/competitorService"
import { getRoleString } from "@/utils/string"
import {
  faAdd,
  faEllipsisVertical,
  faUserEdit,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import CompetitorNode from "./competitorNode"
import { motion } from "framer-motion"
import Tournament, { TournamentRegistration } from "@/models/Tournament"
import { tournamentAPI } from "@/services/tournamentsService"
import {
  confirmTournamentRegistration,
  deleteTournamentRegistration,
  updateTournamentRegistration,
} from "@/store/actions/tournamentAction"
import { useAppDispatch } from "@/hooks/redux"
import CompetitorEditor from "@/components/competitorEditor"

type Props = {
  tournament?: Tournament
  competitors: TournamentRegistration[]
  search?: boolean
  action: () => void
  inactive?: boolean
}

const CompetitorsSection = ({
  tournament,
  competitors,
  action,
  search = true,
  inactive = false,
}: Props) => {
  const dispatch = useAppDispatch()

  const [searchString, setSearchString] = useState("")

  const [selectedCompetitors, setSelectedCompetitors] = useState(
    Array<TournamentRegistration>
  )

  const selectAllCompetitors = () => {
    if (competitors) {
      setSelectedCompetitors([])
      if (!(selectedCompetitors.length === competitors?.length)) {
        setSelectedCompetitors(competitors)
      }
    }
  }

  const unconfirm = () => {
    if (selectedCompetitors.length > 0) {
      selectedCompetitors.forEach((item, index) => {
        if (item.confirm)
          dispatch(
            updateTournamentRegistration(
              item.id,
              item.weight,
              item.weight_class.id,
              item.category,
              false,
              item.paid,
              item.hand
            )
          ).then((res) => {
            if (res && res.status === 200) {
              window.location.reload()
            } else {
              alert("Произошла ошибка!")
            }
          })
      })
    }
  }

  const confirm = () => {
    if (selectedCompetitors.length > 0) {
      selectedCompetitors.forEach((item, index) => {
        if (!item.confirm) dispatch(confirmTournamentRegistration(item.id))
      })
    }
  }

  const deleteCompetitors = () => {
    if (selectedCompetitors.length > 0) {
      selectedCompetitors.forEach((item) => {
        if (!item.confirm) dispatch(deleteTournamentRegistration(item.id))
      })
    }
  }

  const toggleCompetitorSelection = (competitor: TournamentRegistration) => {
    // Check if the competitor is already selected
    if (selectedCompetitors.includes(competitor)) {
      // If selected, remove it from the list
      setSelectedCompetitors((prevSelected) =>
        prevSelected.filter((selected) => selected !== competitor)
      )
    } else {
      // If not selected, add it to the list
      setSelectedCompetitors((prevSelected) => [...prevSelected, competitor])
    }
  }

  return (
    <div className="w-full">
      <div>
        <div>
          <div
            hidden={!search}
            className="mb-4 flex items-center justify-between gap-4"
          >
            <div hidden={!search} className="w-11/12">
              <input
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                type="text"
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-gray-400 shadow-inner outline-none transition focus:border-lightblue-200 focus:text-lightblue-200 focus:shadow-md"
                placeholder="Поиск спортсмена"
              />
            </div>
            <div hidden={!search}>
              <ActionButton
                className="flex items-center gap-2 px-[25px] py-[10px] font-medium text-gray-600"
                onClick={action}
              >
                <div>Добавить</div>
                <FontAwesomeIcon className="text-sm" icon={faUserPlus} />
              </ActionButton>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.5 }}
          transition={{ delay: 0.15 }}
          className={` w-full items-center justify-end ${
            selectedCompetitors.length === 0 ? "hidden" : "flex"
          } gap-2`}
          hidden={selectedCompetitors.length === 0 || inactive}
        >
          <button
            onClick={() => {
              deleteCompetitors()
              window.location.reload()
            }}
            className="rounded-lg border-[1px] border-primary-500 px-4 py-1 text-sm font-medium text-primary-500 transition hover:bg-primary-500 hover:text-white"
          >
            Удалить
          </button>
          <button
            onClick={unconfirm}
            className="rounded-lg border-[1px] border-secondary-500 px-4 py-1 text-sm font-medium text-secondary-500 transition hover:bg-secondary-500 hover:text-white"
          >
            Отменить
          </button>
          <button
            onClick={() => {
              confirm()
              window.location.reload()
            }}
            className="rounded-lg border-[1px] border-secondary-500 px-4 py-1 text-sm font-medium text-secondary-500 transition hover:bg-secondary-500 hover:text-white"
          >
            Подтвердить
          </button>
        </motion.div>
        <div className="w-full rounded-2xl bg-white py-5">
          <div className="flex w-full justify-between text-sm font-medium text-gray-400">
            <div className="flex w-1/6 items-center gap-2 px-4">
              {!inactive && (
                <Checkbox
                  className="mt-1 cursor-pointer"
                  isChecked={selectedCompetitors.length === competitors?.length}
                  changeState={selectAllCompetitors}
                />
              )}
              <div
                className="cursor-pointer"
                onClick={!inactive ? selectAllCompetitors : () => {}}
              >
                Участник
              </div>
            </div>
            <div>Подтверждение</div>
            <div>Рука</div>
            <div>Категория</div>
            <div>Весовая категория</div>
            <div>Рейтинг</div>
          </div>
          <div className="mb-4 mt-6 h-[1px] w-full bg-gray-200"></div>
          <div className="w-full">
            {competitors
              ?.filter((item) =>
                getCompetitorFullname(item.competitor)
                  ?.toLowerCase()
                  .trim()
                  .includes(searchString.toLowerCase().trim())
              )
              .map((item, index) => (
                <CompetitorNode
                  competitor={item}
                  key={index}
                  selected={selectedCompetitors.includes(item)}
                  toggleSelection={() =>
                    !inactive && toggleCompetitorSelection(item)
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitorsSection
