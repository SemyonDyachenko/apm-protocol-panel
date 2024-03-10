import Tournament from "@/models/Tournament"
import CustomSelect from "@/components/UI/CustomSelect"
import ActionButton from "@/components/UI/ActionButton"
import { tournamentCategories } from "@/utils/string"
import { competitorAPI } from "@/services/competitorService"
import { weightClassAPI } from "@/services/weightClassService"
import { tournamentAPI } from "@/services/tournamentsService"
import { getCompetitorFullname } from "@/models/Competitor"
import { useState } from "react"
import NonImage from "/assets/utils/nonuserimage.jpg"
import MatchItem from "@/components/matchItem"
import { useAppDispatch } from "@/hooks/redux"
import { createMatch } from "@/store/actions/matchAction"
import { matchAPI } from "@/services/matchService"

type Props = {
  tournament: Tournament
}

const ManualSystem = ({ tournament }: Props) => {
  const dispatch = useAppDispatch()
  const { data: competitors } =
    tournamentAPI.useFetchTournamentRegistrationQuery(tournament.id)
  const { data: classes } = weightClassAPI.useFetchTournamentClassesQuery(
    tournament.id
  )
  const [category, setCategory] = useState("men")
  const [weightClass, setWeightClass] = useState(
    classes?.filter((item) => item.category === category)[0].id
  )

  const [firstCompetitor, setFirstCompetitor] = useState()
  const [secondCompetitor, setSecondCompetitor] = useState()

  const [hand, setHand] = useState("left")

  const { data: matches, refetch: refreshMatches } =
    matchAPI.useFetchMatchesQuery(tournament.id)

  const addMatch = () => {
    if (weightClass && firstCompetitor && secondCompetitor)
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
      ).then((res) => {
        refreshMatches()
        setHand(hand)
      })
  }

  if (competitors && classes)
    return (
      <div>
        <div>
          <div className="my-2 flex gap-2">
            <div
              onClick={() => setHand("right")}
              className={`text-md cursor-pointer rounded-lg  ${
                hand === "right" ? "bg-secondary-500" : "bg-gray-200"
              } px-8 py-2 font-semibold text-gray-600 transition hover:bg-secondary-500`}
            >
              Правая
            </div>
            <div
              onClick={() => setHand("left")}
              className={`text-md ${
                hand === "left" ? "bg-secondary-500" : "bg-gray-200"
              } cursor-pointer rounded-lg  px-8 py-2  font-semibold text-gray-600 transition hover:bg-secondary-500`}
            >
              Левая
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <div className="my-1 text-sm text-lightblue-200">Категория:</div>
              <CustomSelect
                className=""
                value={category}
                setValue={setCategory}
              >
                {tournamentCategories.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.title}
                  </option>
                ))}
              </CustomSelect>
            </div>
            <div>
              <div className="my-1 text-sm text-lightblue-200">
                Весовая категория:
              </div>
              <CustomSelect
                className="w-[160px]"
                value={weightClass}
                setValue={setWeightClass}
              >
                <option>Нет</option>
                {classes
                  .filter((item) => item.category === category)
                  .map((item, index) => (
                    <option key={index} value={item.weight_class.id}>
                      {item.weight_class.name} Кг
                    </option>
                  ))}
              </CustomSelect>
            </div>
            <div>
              <div className="my-1 text-sm text-lightblue-200">
                Спортсмен 1:
              </div>
              <CustomSelect
                className=""
                value={firstCompetitor}
                setValue={setFirstCompetitor}
              >
                <option>Нет</option>
                {competitors
                  .filter(
                    (item) =>
                      item.category === category &&
                      item.weight_class.id == weightClass &&
                      item.hand === hand &&
                      item.confirm
                  )
                  .map((item, index) => (
                    <option key={index} value={item.competitor.id}>
                      {getCompetitorFullname(item.competitor)}
                    </option>
                  ))}
              </CustomSelect>
            </div>
            <div>
              <div className="my-1 text-sm text-lightblue-200">
                Спортсмен 2:
              </div>
              <CustomSelect
                className=""
                value={secondCompetitor}
                setValue={setSecondCompetitor}
              >
                <option>Нет</option>
                {competitors
                  .filter(
                    (item) =>
                      item.category === category &&
                      item.weight_class.id == weightClass &&
                      item.hand === hand &&
                      item.confirm
                  )
                  .map((item, index) => (
                    <option key={index} value={item.competitor.id}>
                      {getCompetitorFullname(item.competitor)}
                    </option>
                  ))}
              </CustomSelect>
            </div>
            <div className="flex items-center">
              <ActionButton
                className="mt-6 rounded-xl px-8 font-medium text-gray-600"
                onClick={addMatch}
              >
                Добавить
              </ActionButton>
            </div>
          </div>
        </div>
        <div className="my-4 h-[1px] w-full bg-gray-200"></div>
        <div className="mt-4">
          <div className="text-2xl font-semibold text-lightblue-200">
            Поединки
          </div>
          <div className="flex gap-4">
            <div className="mt-4 w-1/2">
              <div className="my-1  text-sm text-gray-400">Стол 1</div>
              <div>
                {matches
                  ?.filter((item) => item.weight_class.name == "75")
                  .map((item, index) => (
                    <MatchItem
                      refreshWinner={refreshMatches}
                      match={item}
                      tournament={tournament}
                    />
                  ))}
              </div>
            </div>
            <div className="mt-4 w-1/2">
              <div className="my-1  text-sm text-gray-400">Стол 2</div>
              <div>
                {" "}
                {matches
                  ?.filter((item) => item.weight_class.name == "65")
                  .map((item, index) => (
                    <MatchItem
                      refreshWinner={refreshMatches}
                      match={item}
                      tournament={tournament}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  return <div>data is empty</div>
}

export default ManualSystem
