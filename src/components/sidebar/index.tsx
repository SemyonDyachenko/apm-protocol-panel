import {
  IconDefinition,
  faGear,
  faHome,
  faRightFromBracket,
  faU,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

type Props = {
  className?: string
  items: Array<SidebarItem>
  changeState: (target: string) => void
}

export type SidebarItem = {
  title: string
  onClick: () => void
  icon: IconDefinition
  selected?: boolean
  disabled?: boolean
}

const SidebarMenu = ({ className, items, changeState }: Props) => {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (selected !== null) {
      if (!items[selected].disabled) items[selected].onClick()
    }
  }, [selected])

  return (
    <div className={`left-0 top-0 ${className} h-screen bg-white shadow-md`}>
      <div className="flex w-full justify-center py-5">
        <img
          className="max-w-[150px]"
          src={"https://apm-league.ru/assets/logo/blacklogo.png"}
          alt="image"
        />
      </div>
      <div className="mt-16">
        <div className="flex flex-col gap-y-2  font-medium text-gray-400">
          {items.map((item, index) => (
            <div
              onClick={() => {
                if (!item.disabled) setSelected(index)
              }}
              key={index}
              className={`flex cursor-pointer items-center gap-4 px-8 py-4 transition hover:bg-gray-70 ${
                selected === index &&
                " border-r-4 border-secondary-500 text-secondary-500"
              }`}
            >
              <div>
                <FontAwesomeIcon className="text-lg" icon={item.icon} />
              </div>
              <div>{item.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 mb-10 px-8 font-medium ">
        <div className="flex items-center gap-4 text-gray-400 transition hover:text-secondary-500">
          <FontAwesomeIcon icon={faRightFromBracket} />
          <Link to="/logout">Выйти</Link>
        </div>
      </div>
    </div>
  )
}

export default SidebarMenu
