import React, { useState } from "react"
import { Link } from "react-router-dom"
import Popup from "../popup"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"

type Props = {
  competitor: Competitor
}

const CompetitorListItem = ({ competitor }: Props) => {
  const [menu, setMenu] = useState(false)
  const [popupPosition, setPopupPosition] = useState(0)

  const handleContextMenu = (event: any) => {
    event.preventDefault()
    const x = event.clientX
    setPopupPosition(x)
    setMenu(true)
  }

  return (
    <div>
      <div
        onContextMenu={handleContextMenu}
        className={`competitors-center my-2 flex w-full cursor-pointer justify-between px-4 py-4 transition hover:rounded-lg hover:bg-gray-80 `}
      >
        <div className="w-1/4 font-medium text-gray-600">
          {getCompetitorFullname(competitor)}
        </div>
        <div className=" w-1/6 text-sm text-gray-400"></div>
        <div className="w-1/6 pl-5 text-sm text-gray-400"></div>
        <div className="w-1/5  text-sm text-gray-400"></div>
        <div className=" w-1/12 text-sm text-gray-400"></div>
        <div className="w-1/12 pl-10 text-end text-sm text-secondary-500">
          {competitor.elo_rating}
        </div>
      </div>
      <Popup
        style={{ left: popupPosition }}
        className={`] rounded-lg border-[1px] bg-white text-lightblue-200`}
        active={menu}
        closeFunc={() => setMenu(false)}
      >
        <div className="flex  flex-col py-2 text-sm font-medium">
          <Link to={`/competitor/editing/${competitor.id}`}>
            <div className="cursor-pointer px-4 py-2 transition hover:bg-gray-200">
              Редактировать
            </div>
          </Link>
        </div>
      </Popup>
    </div>
  )
}

export default CompetitorListItem
