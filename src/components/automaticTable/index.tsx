import Match from "@/models/Match"
import Tournament, { TournamentRegistration } from "@/models/Tournament"
import { Dispatch, useEffect, useState } from "react"
import MatchItem from "@/components/matchItem"
import WeightClass, { TournamentWeightClass } from "@/models/WeightClass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import CustomSelect from "@/components/UI/CustomSelect"
import { motion } from "framer-motion"
import { getRoundStatus, tournamentCategories } from "@/utils/string"
import competitors from "@/pages/competitors"
import { matchAPI } from "@/services/matchService"
import Competitor from "@/models/Competitor"
import { useAppDispatch } from "@/hooks/redux"
import { removeMatchesFromCategory } from "@/store/actions/matchAction"
import registration from "@/pages/editCompetitor/registration"

type Props = {
  competitors: TournamentRegistration[]
  refreshMatches: () => void
  matches: Match[]
  tournament: Tournament
  classes: TournamentWeightClass[]
  category: string
  hand: string
  name: number
  addMatch: (
    hand: string,
    weightClass: number,
    firstCompetitor: number,
    secondCompetitor: number,
    category: string,
    round?: number
  ) => void
}

type CompetitorWithLosses = {
  competitor: Competitor
  losses: number
}

const AutomaticMatchTable = ({
  tournament,
  classes,
  category,
  name,
  competitors,
  addMatch,
  matches,
  refreshMatches,
}: Props) => {
  const dispatch = useAppDispatch()
  const [selectedWeightClass, setSelectedWeightClass] = useState(-1)
  const [filteredMatches, setFilteredMatches] = useState(Array<Match>())
  const [paramsOpened, setParamsOpened] = useState(false)
  const [selectedHand, setSelectedHand] = useState("left")
  const [selectedCategory, setSelectedCategory] = useState(category)
  const [history, setHistory] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)

  const [initialCompetitors, setInitialCompetitors] =
    useState<Array<CompetitorWithLosses>>()

  const [winners, setWinners] = useState<CompetitorWithLosses[]>([])
  const [losers, setLosers] = useState<CompetitorWithLosses[]>([])
  const [winnersWithoutPairs, setWinnersWithoutPairs] =
    useState<CompetitorWithLosses | null>(null)
  const [losersWithoutPairs, setLosersWithoutPairs] =
    useState<CompetitorWithLosses | null>(null)

  const [roundType, setRoundType] = useState("")
  const [triggerUpdate, setTriggerUpdate] = useState(false)
  const [isLoadingMatches, setIsLoadingMatches] = useState(false)

  const [stopedCategory, stopCategory] = useState(false)

  const [finishedCategories, setFinishedCategories] = useState(new Set())
  const [acceptLosers, setAcceptLosers] = useState(false)

  const addFinishedCategory = (item: number) => {
    setFinishedCategories(new Set(finishedCategories).add(item))
  }

  useEffect(() => {
    refreshMatches()
    if (!isLoadingMatches) {
      setFilteredMatches(
        matches.filter(
          (match) =>
            match.category == selectedCategory &&
            match.weight_class.id == selectedWeightClass &&
            match.hand == selectedHand
        )
      )
    }
    refreshMatches()
  }, [
    matches,
    selectedWeightClass,
    selectedHand,
    selectedCategory,
    isLoadingMatches,
  ])

  useEffect(() => {
    const initialCompetitorsWithLosses = competitors
      .filter(
        (registration) =>
          registration.category == selectedCategory &&
          registration.hand == selectedHand &&
          registration.weight_class.id == selectedWeightClass &&
          registration.confirm
      )
      .map((registration) => ({
        competitor: registration.competitor,
        losses: 0, // Начальное количество поражений для каждого участника
      }))

    setInitialCompetitors(initialCompetitorsWithLosses)
  }, [competitors, selectedWeightClass, selectedHand, selectedCategory])

  const createMatches = (
    competitorsWithLosses: CompetitorWithLosses[],
    round: number,
    winners: boolean
  ) => {
    let newWinnersWithoutPairs = null // Копируем текущих участников без пар
    let newLosersWithoutPairs = null

    for (let i = 0; i < competitorsWithLosses.length; i += 2) {
      if (i + 1 < competitorsWithLosses.length) {
        addMatch(
          selectedHand,
          selectedWeightClass,
          competitorsWithLosses[i].competitor.id,
          competitorsWithLosses[i + 1].competitor.id,
          category,
          round
        )
      } else {
        if (winners) {
          if (competitorsWithLosses[i].losses == 0)
            newWinnersWithoutPairs = competitorsWithLosses[i]
        } else {
          newLosersWithoutPairs = competitorsWithLosses[i]
        }
      }
    }
    if (newWinnersWithoutPairs) setWinnersWithoutPairs(newWinnersWithoutPairs)
    if (newLosersWithoutPairs) setLosersWithoutPairs(newLosersWithoutPairs)

    setIsLoadingMatches(true)
    refreshMatches()
    setTimeout(() => {
      setIsLoadingMatches(false)
    }, 250) // Adjust delay based on expected refresh duration
  }

  const startCategory = () => {
    if (!initialCompetitors) {
      return -1
    }
    stopCategory(false)

    if (currentRound === 0) {
      setCurrentRound(1)
      const shuffledCompetitors = [...initialCompetitors].sort(
        () => 0.5 - Math.random()
      )
      createMatches(shuffledCompetitors, 1, true)
    } else {
      nextRound()
    }
  }

  const nextRound = () => {
    let newWinners: CompetitorWithLosses[] = []
    let newLosers: CompetitorWithLosses[] = []

    if (winnersWithoutPairs && winnersWithoutPairs.losses < 2)
      newWinners.push(winnersWithoutPairs)
    if (losersWithoutPairs && losersWithoutPairs.losses < 2)
      newLosers.push(losersWithoutPairs)

    setWinnersWithoutPairs(null)
    setLosersWithoutPairs(null)

    // setLosersWithoutPairs([])
    // setWinnersWithoutPairs([])

    const roundMatches = filteredMatches.filter(
      (item) => item.winner && item.round == currentRound
    )

    roundMatches.forEach((match) => {
      const winnerCompetitor =
        match.first_competitor.id === match.winner
          ? match.first_competitor
          : match.second_competitor

      const loserCompetitor =
        match.first_competitor.id === match.winner
          ? match.second_competitor
          : match.first_competitor

      if (currentRound == 1) {
        let winner = initialCompetitors?.find(
          (item) => item.competitor.id == winnerCompetitor.id
        )

        let loser = initialCompetitors?.find(
          (item) => item.competitor.id == loserCompetitor.id
        )
        if (loser) {
          loser.losses = 1
        }

        if (winner) newWinners.push(winner)
        if (loser) newLosers.push(loser)
      } else {
        const winnerInWins = [...winners, ...losers].find(
          (item) => item.competitor.id == winnerCompetitor.id
        )
        let loserInWins = [...winners, ...losers].find(
          (item) => item.competitor.id == loserCompetitor.id
        )

        if (winnerInWins) {
          if (
            winners.find(
              (item) => item.competitor.id == winnerInWins?.competitor.id
            )
          ) {
            if (winnerInWins.losses < 2) newWinners.push(winnerInWins)
          } else {
            if (winnerInWins.losses < 2) newLosers.push(winnerInWins)
          }
        }

        if (loserInWins) {
          if (
            winners.find(
              (item) => item.competitor.id == loserInWins?.competitor.id
            )
          ) {
            loserInWins.losses += 1
            if (loserInWins.losses < 2) newLosers.push(loserInWins)
          } else {
            loserInWins.losses = 2
          }
        }
      }
    })

    if (newWinners.length === 1 && newLosers.length === 2) {
      setRoundType("midifinal")
    }

    if (newLosers.length === 1 && newWinners.length === 1) {
      if (roundType === "final") {
        setRoundType("superfinal")
      } else {
        setRoundType("final")
      }
      setWinners([...newWinners, ...newLosers])
      setLosers([])
    } else {
      setWinners(newWinners)
      setLosers(newLosers)
    }

    setCurrentRound((current) => current + 1)

    refreshMatches()
  }

  useEffect(() => {
    // Этот useEffect срабатывает каждый раз, когда обновляется состояние winners
    if (winners.length > 0 && currentRound > 0) {
      createMatches(winners, currentRound, true)
      refreshMatches()
      setTriggerUpdate((prev) => !prev)
      setAcceptLosers(true)
    }
  }, [winners, currentRound]) // Зависимости: winners и currentRound

  useEffect(() => {
    // Этот useEffect срабатывает каждый раз, когда обновляется состояние losers
    if (losers.length > 0 && currentRound > 0) {
      if (acceptLosers) {
        createMatches(losers, currentRound, false)
        refreshMatches()
        setTriggerUpdate((prev) => !prev)
        setAcceptLosers(false)
      }
    }
  }, [losers, currentRound, acceptLosers]) // Зависимости: losers и currentRound

  const clearCategoryRounds = () => {
    if (selectedWeightClass && selectedHand && category) {
      dispatch(
        removeMatchesFromCategory(
          selectedHand,
          category,
          tournament.id,
          Number(selectedWeightClass)
        )
      ).then((res) => {
        if (res && res.status == 200) {
          window.location.reload()
        }
      })
    }
  }
  const allMatchesDecided = (matches: Match[]) => {
    return matches.length > 0 && matches.every((match) => match.winner)
  }

  useEffect(() => {
    refreshMatches()
    console.log("matches changed")
  }, [matches, triggerUpdate])

  const [lastUpdatedRound, setLastUpdatedRound] = useState(0)

  useEffect(() => {
    refreshMatches()
    setLastUpdatedRound(currentRound)
  }, [currentRound])

  useEffect(() => {
    refreshMatches()
    if (!isLoadingMatches && currentRound !== 0) {
      const roundMatches = filteredMatches.filter(
        (item) => item.round === currentRound
      )
      if (allMatchesDecided(roundMatches)) {
        nextRound()
      }
    }
    refreshMatches()
  }, [filteredMatches, currentRound])

  return (
    <div className="mt-4 w-1/2 px-2">
      <div>
        <div className="flex items-center justify-between pr-4">
          <div className="flex items-center gap-4">
            <div className="text-md my-1 font-medium text-gray-400">
              {roundType.length > 0
                ? getRoundStatus(roundType)
                : `Раунд ${currentRound}`}
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
            <div
              onClick={startCategory}
              className="flex cursor-pointer items-center gap-2 text-sm text-secondary-500  transition  hover:text-secondary-300"
            >
              Запустить
            </div>
            <div
              onClick={clearCategoryRounds}
              className="flex cursor-pointer items-center gap-2 text-sm text-primary-500  transition  hover:text-primary-300"
            >
              Сбросить
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
        className={`${!history && "hidden"} `}
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
                refreshWinner={refreshMatches}
                match={item}
                refreshMatches={refreshMatches}
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
          ?.filter((item) => item.round == currentRound && !item.winner)
          .slice(0, 2)
          .map((item, index) => (
            <div>
              <MatchItem
                key={index}
                minimize={index !== 0}
                refreshWinner={refreshMatches}
                match={item}
                refreshMatches={refreshMatches}
                tournament={tournament}
              />
              {index === 0 && (
                <div className="w-full text-center text-sm font-medium text-secondary-500">
                  Next
                </div>
              )}
            </div>
          ))}
        {filteredMatches?.filter(
          (item) => item.round == currentRound && !item.winner
        ).length === 0 && (
          <div className="mt-8 flex justify-center text-xl font-medium text-gray-600">
            {stopedCategory ? "Категория завершена" : "Поединки отсутствуют"}
          </div>
        )}
      </div>
    </div>
  )
}

export default AutomaticMatchTable
