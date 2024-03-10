import ActionButton from "@/components/UI/ActionButton"
import CustomSelect from "@/components/UI/CustomSelect"
import Tournament, { TournamentRegistration } from "@/models/Tournament"
import { weightClassAPI } from "@/services/weightClassService"
import { tournamentCategories } from "@/utils/string"
import React, { useState } from "react"
import CompetitorsSection from "../competitors"
import { motion } from "framer-motion"

type Props = {
  tournament: Tournament
  competitors: TournamentRegistration[]
}

const CategoryWindow = ({ tournament, competitors }: Props) => {
  const { data: classes } = weightClassAPI.useFetchTournamentClassesQuery(
    tournament.id
  )
  const [hand, setHand] = useState("left")
  const [gender, setGender] = useState("men")
  const [category, setCategory] = useState("men")
  const [weight, setWeight] = useState()

  const [saved, setSaved] = useState(false)

  const [competitorsList, setCompetitorsList] =
    useState<TournamentRegistration[]>(competitors)

  const save = () => {
    console.log(weight)
    console.log(competitors)
    setCompetitorsList(
      competitors.filter(
        (item) =>
          item.hand === hand &&
          item.category === category &&
          item.weight_class.id == weight
      )
    )
    if (competitorsList.length > 0) setSaved(true)
  }

  return (
    <div className="px-4">
      <div className="flex flex-wrap items-center gap-4 md:flex-nowrap">
        <div>
          <div className="my-1 text-sm text-lightblue-200">Рука:</div>
          <CustomSelect
            className="w-[200px] py-2"
            value={hand}
            setValue={setHand}
          >
            <option value="left">Левая</option>
            <option value="right">Правая</option>
          </CustomSelect>
        </div>
        <div>
          <div className="my-1 text-sm text-lightblue-200">Пол:</div>
          <CustomSelect
            className="w-[200px] py-2"
            value={gender}
            setValue={setGender}
          >
            <option className="men">Мужчины</option>
            <option className="women">Женщины</option>
          </CustomSelect>
        </div>
        <div>
          <div className="my-1 text-sm text-lightblue-200">Категория:</div>
          <CustomSelect
            className="w-[200px] py-2"
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
            className="w-[200px] py-2"
            value={weight}
            setValue={setWeight}
          >
            <option value={-1}>Нет</option>
            {classes
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <option key={index} value={item.weight_class.id}>
                  {item.weight_class.name} Кг
                </option>
              ))}
          </CustomSelect>
        </div>

        <div>
          <div className="my-1 text-sm text-transparent">Сохранить</div>
          <ActionButton
            className="rounded-xl px-8 font-medium text-gray-600"
            onClick={save}
          >
            Сохранить
          </ActionButton>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        viewport={{ once: false, amount: 0.5 }}
        hidden={!saved}
      >
        <div className="mt-8">
          <CompetitorsSection
            inactive
            action={() => {}}
            search={false}
            competitors={competitorsList}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default CategoryWindow
