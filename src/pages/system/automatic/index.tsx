import Tournament, { TournamentRegistration } from "@/models/Tournament"
import ActionButton from "@/components/UI/ActionButton"
import MatchTable from "@/components/matchTable"
import { TournamentWeightClass } from "@/models/WeightClass"
import { useState } from "react"
import { useAppDispatch } from "@/hooks/redux"
import { matchAPI } from "@/services/matchService"
import AutomaticMatchTable from "@/components/automaticTable"
import { createMatch } from "@/store/actions/matchAction"
import MatchesTable from "@/components/matchesTable"
import CategoriesTable from "@/components/categoriesTable"

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

  const [matchesTable, openMatchesTable] = useState(false)
  const [categoriesTable, openCategoriesTable] = useState(false)

  const addMatch = (
    hand: string,
    weightClass: number,
    firstCompetitor: number,
    secondCompetitor: number,
    category: string,
    round?: number
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
        round: round,
      })
    )
  }

  return (
    <div>
      <div className="mb-4 mt-8 flex items-center justify-between">
        <div className="flex items-center gap-x-8">
          <div className="text-3xl font-semibold text-lightblue-200">
            Поединки
          </div>
          <div className="flex gap-x-2">
            <ActionButton
              className="py-[4px] text-sm font-medium text-gray-600"
              onClick={() => openMatchesTable(!matchesTable)}
            >
              Список поединков
            </ActionButton>
            <ActionButton
              className="py-[4px] text-sm font-medium text-gray-600"
              onClick={() => {}}
            >
              Протоколы
            </ActionButton>
            <ActionButton
              className="py-[4px] text-sm font-medium text-gray-600"
              onClick={() => openCategoriesTable(!categoriesTable)}
            >
              Категории
            </ActionButton>
          </div>
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
      <div className="w-full">
        <div className="flex w-full flex-wrap">
          {matches &&
            tablesCount.map((item, index) => (
              <AutomaticMatchTable
                competitors={competitors.filter((item) => item.confirm)}
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
      {matches && classes && (
        <MatchesTable
          hidden={!matchesTable}
          closeFunc={() => openMatchesTable(false)}
          tournament={tournament}
          weightClasses={classes}
          matches={matches}
        />
      )}
      {classes && (
        <CategoriesTable
          hidden={!categoriesTable}
          classes={classes}
          closeFunc={() => openCategoriesTable(false)}
        />
      )}
    </div>
  )
}

export default AutomaticSystem
