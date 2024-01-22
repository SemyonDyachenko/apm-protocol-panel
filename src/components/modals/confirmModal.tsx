import React, { useEffect } from "react"
import Popup from "../popup"
import ActionButton from "../UI/ActionButton"

type Props = {
  active: boolean
  closeFunc: () => void
  action: () => void
  text: string
}

const ConfirmModal = ({ active, closeFunc, action, text }: Props) => {
  useEffect(() => {
    document.body.style.overflowY = active ? "hidden" : "scrollY"
  }, [active])

  return (
    <div hidden={!active}>
      <div
        hidden={!active}
        className="absolute left-0 top-0 z-[1]  h-screen w-screen bg-black opacity-40"
      ></div>

      <div className="p-10">
        <div className="text-xl font-medium text-lightblue-200">{text}</div>
        <div className="flex w-full items-center justify-center gap-2 pt-6">
          <ActionButton
            className="w-1/2 px-8 font-medium text-gray-600"
            onClick={action}
          >
            Да
          </ActionButton>
          <ActionButton
            className="w-1/2 font-medium text-white"
            gray
            onClick={closeFunc}
          >
            Нет
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
