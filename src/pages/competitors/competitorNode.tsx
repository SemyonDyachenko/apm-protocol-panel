import Checkbox from "@/components/UI/Checkbox"
import CompetitorEditor from "@/components/competitorEditor"
import Popup from "@/components/popup"
import { useAppDispatch } from "@/hooks/redux"
import Competitor, {
  getCompetitorFullname,
  getCompetitorGender,
} from "@/models/Competitor"
import { TournamentRegistration } from "@/models/Tournament"
import { deleteTournamentRegistration } from "@/store/actions/tournamentAction"
import { getCategoryString, getRoleString } from "@/utils/string"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { copyFile } from "fs"
import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"

type Props = {
  competitor: TournamentRegistration
  selected: boolean
  toggleSelection: () => void
}

const CompetitorNode = ({ competitor, selected, toggleSelection }: Props) => {
  const dispatch = useAppDispatch()
  const [menu, setMenu] = useState(false)
  const [popupPosition, setPopupPosition] = useState(0)

  const handleContextMenu = (event: any) => {
    event.preventDefault()
    const x = event.clientX
    setPopupPosition(x)
    setMenu(true)
  }

  const deleteCompetitor = () => {
    dispatch(deleteTournamentRegistration(competitor.id)).then((res) => {
      if (res && res.status === 200) {
        window.location.reload()
      }
    })
  }

  return (
    <div>
      <div
        onContextMenu={handleContextMenu}
        onClick={toggleSelection}
        className={`competitors-center my-2 flex w-full cursor-pointer justify-between px-4 py-4 transition hover:rounded-lg hover:bg-gray-80 ${
          selected && "rounded-lg bg-gray-70 "
        }`}
      >
        <div className="">
          <Checkbox
            className="mt-2"
            isChecked={selected}
            changeState={toggleSelection}
          />
        </div>
        <div className="w-1/4 font-medium text-gray-600">
          {getCompetitorFullname(competitor.competitor)}
        </div>
        <div className=" w-1/6 text-sm text-gray-400">
          {competitor.confirm ? (
            <FontAwesomeIcon
              className="pl-10 text-lg  text-green-500"
              icon={faCheck}
            />
          ) : (
            "Не подтвержден"
          )}
        </div>
        <div className="w-1/6 pl-5 text-sm text-gray-400">
          {getCompetitorGender(competitor.competitor)}
        </div>
        <div className="w-1/5  text-sm text-gray-400">
          {getCategoryString(competitor.category)}
        </div>
        <div className=" w-1/12 text-sm text-gray-400">
          {competitor.weight_class.name} Кг
        </div>
        <div className="w-1/12 pl-10 text-end text-sm text-secondary-500">
          {competitor.competitor.elo_rating}
        </div>
      </div>
      <Popup
        style={{ left: popupPosition }}
        className={`] rounded-lg border-[1px] bg-white text-lightblue-200`}
        active={menu}
        closeFunc={() => setMenu(false)}
      >
        <div className="flex  flex-col py-2 text-sm font-medium">
          <div
            onClick={() => {
              toggleSelection()
              setMenu(false)
            }}
            className="cursor-pointer px-4 py-2 transition hover:bg-gray-200"
          >
            Выбрать
          </div>
          <div className="cursor-pointer px-4 py-2 transition hover:bg-gray-200">
            <Link to={`/competitor/editing/${competitor.id}`}>
              Редактировать
            </Link>
          </div>
          <div
            onClick={deleteCompetitor}
            className="cursor-pointer px-4 py-2 text-primary-500 transition hover:bg-gray-200"
          >
            Удалить
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default CompetitorNode
