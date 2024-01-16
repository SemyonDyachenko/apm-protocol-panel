import {
  faAngleLeft,
  faArrowLeft,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

type Props = { className: string }

const ReturnLine = ({ className }: Props) => {
  const returnBack = () => {
    history.back()
  }

  return (
    <div className={className}>
      <div
        onClick={returnBack}
        className="flex w-1/4 cursor-pointer items-center gap-2 text-sm text-gray-400 transition hover:text-secondary-500"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
        <div>Назад</div>
      </div>
    </div>
  )
}

export default ReturnLine
