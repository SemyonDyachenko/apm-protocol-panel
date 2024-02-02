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
}

export type SidebarItem = {
  title: string
  onClick: () => void
  icon: IconDefinition
  selected?: boolean
  disabled?: boolean
  link: string
}

const SidebarMenu = ({ className, items }: Props) => {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (selected !== null) {
      if (!items[selected].disabled) items[selected].onClick()
    }
  }, [selected])

  return (
    <div
      className={`left-0 top-0 ${className} h-screen w-[10%] bg-white shadow-md md:w-[15%]`}
    >
      <div className="flex w-full justify-center py-5">
        <img
          className="hidden max-w-[150px] md:block"
          src={"https://apm-league.ru/assets/logo/blacklogo.png"}
          alt="image"
        />
        <img
          className="max-w-[45px] md:hidden"
          src={"/assets/ico.png"}
          alt="image"
        />
      </div>
      <div className="mt-16">
        <div className="flex flex-col gap-y-2  font-medium text-gray-600">
          {items.map((item, index) => (
            <Link to={`${item.link}`} key={index}>
              <div
                onClick={() => {
                  if (!item.disabled) setSelected(index)
                }}
                key={index}
                className={`flex cursor-pointer items-center gap-4 rounded-2xl py-4 transition hover:bg-gray-70 md:mx-2 md:px-6 ${
                  window.location.pathname === item.link &&
                  "text-secondary-500 hover:bg-secondary-500 md:bg-secondary-500 md:text-white"
                }`}
              >
                <div className="w-full text-center md:w-1/12 md:text-left">
                  <FontAwesomeIcon className="text-lg" icon={item.icon} />
                </div>
                <div className="hidden md:block">{item.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 mb-10 -translate-x-1/2 font-medium md:left-0 md:-translate-x-0 md:px-8">
        <Link className="w-full" to="/logout">
          <div className="flex w-full items-center  text-gray-600 transition hover:text-secondary-500 md:gap-4">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <div className="hidden md:block">Выйти</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SidebarMenu
