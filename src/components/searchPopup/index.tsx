import { motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"
import { tournamentAPI } from "@/services/tournamentsService"
import Tournament from "@/models/Tournament"
import { Link } from "react-router-dom"
import { getNormalizeDate } from "@/utils/date"
import { popupRef } from "@/hooks/popup"

type Props = {
  active: boolean
  closeFunc: () => void
  searchString: string
}

const SearchPopup = ({ active, closeFunc, searchString }: Props) => {
  const ref = popupRef()

  const { data: tournaments } = tournamentAPI.useFetchTournamentsQuery(1)

  const [valideTournaments, setValideTournaments] = useState<Tournament[]>()

  useEffect(() => {
    if (tournaments && searchString.length > 0)
      setValideTournaments(
        tournaments.filter((item) =>
          item.name
            .trim()
            .toLowerCase()
            .includes(searchString.trim().toLowerCase())
        )
      )

    console.log(tournaments)
  }, [searchString])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        setValideTournaments([])
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
      ref={ref}
      hidden={!active}
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      viewport={{ amount: 0.5 }}
      className="absolute mt-2 h-auto rounded-2xl border-[1px] bg-white  shadow-md
   md:w-[340px]"
    >
      <div className="py-5">
        {valideTournaments?.map((item, index) => (
          <div className="px-5 py-2 transition hover:bg-gray-200" key={index}>
            <Link
              className="flex items-center justify-between"
              to={`/tournament/${item.id}`}
            >
              <div className="text-md text-secondary-500 underline">
                {item.name}
              </div>
              <div className="text-[13px] text-gray-400">{item.date}</div>
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default SearchPopup
