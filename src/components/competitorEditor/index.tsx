import React from "react"
import Popup from "../popup"
import Competitor, { getCompetitorFullname } from "@/models/Competitor"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"

type Props = {
  active: boolean
  closeFunc: () => void
  competitor: Competitor
}

const CompetitorEditor = ({ active, closeFunc, competitor }: Props) => {
  return (
    <Popup
      className="left-1/3 top-1/2 -translate-x-1/2 rounded-xl bg-white shadow-md md:min-w-[400px]"
      active={active}
      closeFunc={closeFunc}
    >
      <div className="px-5 py-5">
        <div className="flex items-center justify-end">
          <FontAwesomeIcon
            className="cursor-pointer text-lg text-gray-400"
            onClick={closeFunc}
            icon={faClose}
          />
        </div>
        <div className="w-full py-2 text-center text-lg font-medium text-lightblue-200">
          Редактирование спортсмена
        </div>
        <div className="my-4 rounded-lg border-[1px] px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <img
                  className="h-[55px] w-[55px] rounded-full"
                  src={competitor?.image?.toString() || ""}
                />
              </div>
              <div className="font-medium text-lightblue-200">
                {getCompetitorFullname(competitor)}
              </div>
            </div>
            <div className="font-medium text-secondary-500">
              {competitor.elo_rating}
            </div>
          </div>
        </div>
      </div>
    </Popup>
  )
}

export default CompetitorEditor
