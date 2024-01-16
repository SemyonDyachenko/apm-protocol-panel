import React, { useEffect } from "react"

type Props = {
  items: Array<upMenuItem>
  changeTarget: (target: string) => void
}

export type upMenuItem = {
  title: string
  target: string
  selected?: boolean
  disalbed?: boolean
}

const UpMenu = ({ items, changeTarget }: Props) => {
  const handleChangeTarget = (value: any) => {
    if (changeTarget) changeTarget(value)
  }

  const selectElement = (element: upMenuItem) => {
    items.forEach((element) => {
      if (element.selected) element.selected = false
    })
    element.selected = true
  }

  useEffect(() => {
    selectElement(items[0])
  }, [])

  return (
    <div className="w-full">
      <div className="flex items-center py-2 font-medium transition">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              handleChangeTarget(item.target)
              selectElement(item)
            }}
            className={`${
              item.selected &&
              "border-b-2 border-secondary-500 font-semibold text-secondary-500"
            } cursor-pointer px-6  pb-4 text-lightblue-200 transition hover:text-secondary-500 `}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="-mt-[9px] h-[1px] w-full bg-gray-300"></div>
    </div>
  )
}

export default UpMenu
