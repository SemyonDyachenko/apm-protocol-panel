import { CompetitorData } from "@/store/slices/competitorSlice"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

type Props = {
  active: boolean
  closeFunc: () => void
  competitor?: CompetitorData
}

const ProfilePopup = ({ active, closeFunc, competitor }: Props) => {
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as HTMLElement)
      ) {
        closeFunc()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  return (
    <motion.div
      ref={popupRef}
      hidden={!active}
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      viewport={{ amount: 0.5 }}
      className="absolute right-0 -mt-4 mr-10 h-auto w-[250px] rounded-2xl  border-[1px]  bg-white
       shadow-md"
    >
      <div className="text-md my-5   flex flex-col gap-y-2  text-lightblue-200">
        <div className="cursor-pointer px-5 py-1 transition hover:bg-gray-200 hover:bg-opacity-50">
          <Link to="https://apm-league.ru/profile"> Настройки профиля</Link>
        </div>
        <div className="cursor-pointer px-5 py-1 transition hover:bg-gray-200  hover:bg-opacity-50">
          <Link to={`https://apm-league.ru/competitor/${competitor?.id}`}>
            Страница спортсмена
          </Link>
        </div>
        <div className="cursor-pointer px-5 text-secondary-500 transition hover:text-primary-500">
          <Link className="text-primary-500" to="/logout">
            Выйти
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfilePopup
