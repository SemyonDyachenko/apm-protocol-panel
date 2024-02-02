import React, { useEffect } from "react"
import Tournament from "@/models/Tournament"
import { popupRef } from "@/hooks/popup"
import { motion } from "framer-motion"
import { applyScroll } from "@/utils/func"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import ActionButton from "@/components/UI/ActionButton"

type Props = {
  tournament: Tournament
  active: boolean
  closeFunc: () => void
}

const TournamentStartPopup = ({ tournament, active, closeFunc }: Props) => {
  const ref = popupRef()

  useEffect(() => {
    document.body.style.overflowY = active ? "hidden" : "scrollY"
    document.documentElement.scrollTop = 0

    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        applyScroll()
        closeFunc()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  return (
    <div
      className={`absolute ${
        !active && "hidden"
      } left-0 top-0 flex h-screen w-screen items-center justify-center`}
    >
      <div
        className={`max-w-screen  ${
          !active && "hidden"
        }  left-0 top-0 h-screen w-screen bg-black opacity-30`}
      ></div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        viewport={{ amount: 0.5 }}
        className={`absolute  ${
          !active && "hidden"
        }  mt-2 h-auto rounded-2xl border-[1px] bg-white shadow-md  md:w-[500px]
   md:p-2`}
      >
        <div className="flex items-center justify-end px-6 pb-2 pt-4">
          <FontAwesomeIcon
            onClick={closeFunc}
            className="cursor-pointer text-xl text-lightblue-200 transition hover:rotate-180"
            icon={faClose}
          />
        </div>
        <div className="flex justify-center pb-4 text-xl font-medium text-lightblue-200">
          Параметры турнира
        </div>
        <div className="mt-2 px-4">
          <div className="mb-4">
            <div className="my-1 text-sm text-lightblue-200">
              Тип жеребьевки:
            </div>
            <div>
              <select className="w-full rounded-lg border-[1px] border-gray-200 bg-lightblue-100 px-4 py-2 text-lightblue-200 outline-none">
                <option>Обычная</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <div className="my-1 text-sm text-lightblue-200">
              Количество столов:
            </div>
            <div>
              <select className="w-full rounded-lg border-[1px] border-gray-200 bg-lightblue-100 px-4 py-2 text-lightblue-200 outline-none">
                {Array(1, 2, 3, 4).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="my-6">
            <ActionButton
              className="w-full py-2 font-medium text-gray-600"
              onClick={() => {}}
            >
              Начать турнир
            </ActionButton>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TournamentStartPopup
