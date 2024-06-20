import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

type Props = {
  hidden: boolean
  closeFunc: () => void
  title: string
  children: React.ReactNode
}

const ModalWindow = ({ hidden, title, closeFunc, children }: Props) => {
  return (
    <div
      hidden={hidden}
      className=" absolute left-[50%]   top-[50%]  h-[90%] w-[80%]  -translate-x-[50%] -translate-y-[50%] resize rounded-lg border-[1px] border-gray-200 bg-white transition"
    >
      <div className="flex w-full justify-end py-2 pr-2">
        <FontAwesomeIcon
          onClick={closeFunc}
          className="cursor-pointer p-2 text-xl text-gray-400 transition hover:rotate-90 hover:text-gray-600"
          icon={faClose}
        />
      </div>
      <div className="my-2 px-10 text-2xl font-semibold text-lightblue-200">
        {title}
      </div>
      <div className="mx-10 h-[1px] w-auto bg-gray-200"></div>
      <div className="">{children}</div>
    </div>
  )
}

export default ModalWindow
