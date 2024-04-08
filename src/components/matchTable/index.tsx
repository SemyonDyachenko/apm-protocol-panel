import Match from "@/models/Match"
import Tournament from "@/models/Tournament"
import { useEffect, useState } from "react"
import MatchItem from "@/components/matchItem"
import WeightClass, { TournamentWeightClass } from "@/models/WeightClass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import CustomSelect from "@/components/UI/CustomSelect"
import { motion } from "framer-motion"
import { tournamentCategories } from "@/utils/string"

type Props = {
  matches: Array<Match>
  refreshMatches: () => void
  tournament: Tournament
  classes: TournamentWeightClass[]
  category: string
  hand: string
  name: number
}

const MatchTable = ({
  matches,
  refreshMatches,
  tournament,
  classes,
  category,
  name,
}: Props) => {
  const [selectedWeightClass, setSelectedWeightClass] = useState(-1)
  const [filteredMatches, setFilteredMatches] = useState<Array<Match>>()
  const [paramsOpened, setParamsOpened] = useState(false)
  const [selectedHand, setSelectedHand] = useState("left")
  const [selectedCategory, setSelectedCategory] = useState(category)
  const [history, setHistory] = useState(false)

  useEffect(() => {
    setFilteredMatches(
      matches.filter(
        (item) =>
          item.weight_class.id == selectedWeightClass &&
          item.hand == selectedHand &&
          item.category === selectedCategory
      )
    )
    refreshMatches()
  }, [matches, selectedWeightClass, selectedHand, selectedCategory])

  return (
    <div className="mt-4 w-1/2 px-2">
      <div>
        <div className="flex items-center justify-between pr-4">
          <div className="flex items-center gap-4">
            <div className="text-md my-1 font-medium text-gray-400">
              Стол {name.toString()}
            </div>
            <div
              onClick={() => setParamsOpened(!paramsOpened)}
              className="flex cursor-pointer items-center gap-2 text-sm text-lightblue-200 underline transition  hover:text-secondary-500"
            >
              <span>Параметры</span>
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            <div
              onClick={() => setHistory(!history)}
              className="flex cursor-pointer items-center gap-2 text-sm text-lightblue-200 underline transition  hover:text-secondary-500"
            >
              История
            </div>
          </div>
          <div className="cursor-pointer text-sm text-primary-200 underline transition hover:text-primary-500">
            Удалить
          </div>
        </div>
        <div className={`flex gap-2 transition ${!paramsOpened && "hidden"}`}>
          <CustomSelect
            className="my-1 py-[3px]"
            value={selectedCategory}
            setValue={setSelectedCategory}
          >
            {tournamentCategories.map((item, index) => (
              <option key={index} value={item.value}>
                {item.title}
              </option>
            ))}
          </CustomSelect>
          <CustomSelect
            className="my-1 py-[3px]"
            value={selectedWeightClass}
            setValue={setSelectedWeightClass}
          >
            <option value={-1}>Нет</option>
            {classes
              .filter((item) => item.category === selectedCategory)
              .map((item, index) => (
                <option key={index} value={item.weight_class.id}>
                  {item.weight_class.name} Кг
                </option>
              ))}
          </CustomSelect>
          <CustomSelect
            className="my-1 py-[3px]"
            value={selectedHand}
            setValue={setSelectedHand}
          >
            <option value={"left"}>Левая</option>
            <option value={"right"}>Правая</option>
          </CustomSelect>
        </div>
      </div>
      <motion.div
        className={`${!history && "hidden"}`}
        initial={{ height: "0px", opacity: 0 }}
        whileInView={{ height: "auto", opacity: 100 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <div
          className={`max-h-[350px] overflow-y-scroll pr-2 opacity-80 ${
            !history && "hidden"
          }`}
        >
          {filteredMatches
            ?.filter((item) => item.winner)
            .map((item, index) => (
              <MatchItem
                key={index}
                refreshMatches={refreshMatches}
                refreshWinner={refreshMatches}
                match={item}
                tournament={tournament}
              />
            ))}
        </div>
        <div
          className={`my-3 h-[2px] w-full bg-gray-200 ${!history && "hidden"}`}
        ></div>
      </motion.div>
      <div className="max-h-[350px] overflow-y-scroll pr-2">
        {filteredMatches
          ?.filter((item) => !item.winner)
          .map((item, index) => (
            <MatchItem
              key={index}
              refreshMatches={refreshMatches}
              refreshWinner={refreshMatches}
              match={item}
              tournament={tournament}
            />
          ))}
        {filteredMatches?.filter((item) => !item.winner).length === 0 && (
          <div className="mt-8 flex justify-center text-xl font-medium text-gray-600">
            Поединки отсутствуют
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchTable
