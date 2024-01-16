import Tournament from "@/models/Tournament"
import { getNormalizeDate } from "@/utils/date"
import React from "react"
import { Link } from "react-router-dom"

type Props = {
  tournament: Tournament
}

const TournamentFrame = ({ tournament }: Props) => {
  return (
    <Link
      className="transition hover:text-gray-700 "
      to={`/tournament/${tournament.id}`}
    >
      <div className="w-1/2 cursor-pointer rounded-2xl bg-white bg-opacity-60 p-10 shadow-sm transition hover:bg-black hover:bg-opacity-20 md:w-[300px]">
        <div>
          <img
            className="max-h-[55px] max-w-[55px] rounded-full"
            src={tournament.logo ? tournament.logo.toString() : ""}
          />
        </div>
        <div className="pt-4 text-lg font-medium">{tournament.name}</div>
        <div className="mt-1 text-sm text-gray-400">
          {getNormalizeDate(tournament.date)}
        </div>
      </div>
    </Link>
  )
}

export default TournamentFrame
