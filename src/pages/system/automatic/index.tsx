import Tournament, { TournamentRegistration } from "@/models/Tournament"
import ActionButton from "@/components/UI/ActionButton"
import MatchTable from "@/components/matchTable"
import { TournamentWeightClass } from "@/models/WeightClass"
import { useState } from "react"
import { useAppDispatch } from "@/hooks/redux"
import { matchAPI } from "@/services/matchService"
import AutomaticMatchTable from "@/components/automaticTable"
import { createMatch } from "@/store/actions/matchAction"

type Props = {
  tournament: Tournament
  classes: TournamentWeightClass[]
  competitors: TournamentRegistration[]
}

const AutomaticSystem = ({ tournament, classes, competitors }: Props) => {
  const dispatch = useAppDispatch()

  const [tablesCount, setTables] = useState([1, 2])

  const addTable = () => {
    setTables([...tablesCount, tablesCount[tablesCount.length - 1] + 1])
  }

  const { data: matches, refetch: refreshMatches } =
    matchAPI.useFetchMatchesQuery(tournament.id)

  const addMatch = (
    hand: string,
    weightClass: number,
    firstCompetitor: number,
    secondCompetitor: number,
    category: string
  ) => {
    dispatch(
      createMatch({
        hand,
        date: new Date(),
        tournament: tournament.id,
        weight_class: weightClass,
        first_competitor: firstCompetitor,
        second_competitor: secondCompetitor,
        category,
      })
    )
  }

  return (
    <div>
      <div className="mb-4 mt-8 flex items-center justify-between">
        <div className="text-3xl font-semibold text-lightblue-200">
          Поединки
        </div>
        <div>
          <ActionButton
            className="px-6 py-[4px] text-sm font-medium text-gray-600"
            onClick={addTable}
          >
            Добавить стол
          </ActionButton>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap">
          {matches &&
            tablesCount.map((item, index) => (
              <AutomaticMatchTable
                competitors={competitors}
                name={item}
                addMatch={addMatch}
                key={index}
                classes={classes}
                refreshMatches={refreshMatches}
                matches={matches}
                tournament={tournament}
                category={"men"}
                hand={"left"}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default AutomaticSystem
