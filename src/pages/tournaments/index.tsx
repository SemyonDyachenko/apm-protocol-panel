import Loader from "@/components/loader"
import { useAppSelector } from "@/hooks/redux"
import React from "react"

type Props = {}

const TournamentsPage = (props: Props) => {
  const { competitor, loading, error } = useAppSelector(
    (state) => state.competitors
  )

  if (loading) return <Loader />
  if (competitor)
    return (
      <div className="w-10/12">
        <div>
          <div className="my-8 text-3xl font-medium text-lightblue-200">
            Актуальные турниры
          </div>
        </div>
        <div>
            
        </div>
      </div>
    )
}

export default TournamentsPage
