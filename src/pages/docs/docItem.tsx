import React from "react"
import ActionButton from "@/components/UI/ActionButton"
import {
  faDownload,
  faFileArrowDown,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
  logo: IconDefinition
  title: string
  subtitle: string
  onClick?: () => void
}

const DocItem = ({ logo, title, subtitle, onClick }: Props) => {
  return (
    <div className="md:w-[250px]">
      <div className="w-full rounded-2xl bg-lightblue-100 bg-opacity-85 p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-gray-80">
            <FontAwesomeIcon
              className="text-xl text-lightblue-200"
              icon={logo}
            />
          </div>
          <div onClick={onClick} className="cursor-pointer">
            <FontAwesomeIcon
              className="text-3xl text-secondary-500 transition hover:scale-125 hover:text-secondary-600"
              icon={faFileArrowDown}
            />
          </div>
        </div>
        <div className="mt-6">
          <div className="text-sm font-medium text-lightblue-200">{title}</div>
          <div className="text-md font-semibold text-gray-600">{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export default DocItem
