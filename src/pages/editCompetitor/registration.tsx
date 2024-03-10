import ActionButton from "@/components/UI/ActionButton"
import { useAppDispatch } from "@/hooks/redux"
import { getCompetitorGender } from "@/models/Competitor"
import { TournamentRegistration } from "@/models/Tournament"
import { weightClassAPI } from "@/services/weightClassService"
import { updateTournamentRegistration } from "@/store/actions/tournamentAction"
import { getCategoryString, tournamentCategories } from "@/utils/string"
import { competitorInputTitleStyle, competitorinputStyle } from "@/utils/styles"
import React, { useState } from "react"

type Props = {
  competitor: TournamentRegistration
}

const RegistrationWindow = ({ competitor }: Props) => {
  const dispatch = useAppDispatch()

  const { data: classes } = weightClassAPI.useFetchTournamentClassesQuery(
    competitor.tournament
  )

  const [selectedCategory, setSelectedCategory] = useState(competitor.category)
  const [selectedWeightClass, setSelectedWeightClass] = useState(
    competitor.weight_class.id
  )
  const [weight, setWeight] = useState(competitor.weight.toString())
  const [confirm, setConfirm] = useState(competitor.confirm)
  const [paid, setPaid] = useState(competitor.paid)
  const [hand, setHand] = useState(competitor.hand)

  const update = () => {
    dispatch(
      updateTournamentRegistration(
        competitor.id,
        Number(weight),
        selectedWeightClass,
        selectedCategory,
        confirm,
        paid,
        hand
      )
    ).then((res) => {
      if (res && res.status === 200) {
        window.location.reload()
      } else {
        alert("Произошла ошибка!")
      }
    })
  }

  return (
    <div className="w-full px-4 md:w-10/12 md:pb-5">
      <div className="grid w-full gap-8 md:grid-cols-3">
        <div>
          <div className={competitorInputTitleStyle}>Пол:</div>
          <input
            disabled
            defaultValue={getCompetitorGender(competitor.competitor) || ""}
            className={competitorinputStyle}
          />
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Категория:</div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`${competitorinputStyle} `}
          >
            {tournamentCategories.map((item, index) => (
              <option key={index} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Оплата:</div>
          <select
            value={paid.toString()}
            onChange={(e) => setPaid(e.target.value === "true")}
            className={competitorinputStyle}
          >
            <option value={"true"}>Оплачен</option>

            <option value={"false"}>Не оплачен</option>
          </select>
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Статус:</div>
          <select
            value={confirm.toString()}
            onChange={(e) => setConfirm(e.target.value === "true")}
            className={competitorinputStyle}
          >
            <option value={"true"}>Подтвержден</option>

            <option value={"false"}>Не подтвержден</option>
          </select>
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Рука:</div>
          <select
            value={hand}
            onChange={(e) => setHand(e.target.value)}
            className={competitorinputStyle}
          >
            <option value="left">Левая</option>

            <option value="right">Правая</option>
          </select>
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Весовая категория:</div>
          <select
            value={selectedWeightClass}
            onChange={(e) => setSelectedWeightClass(+e.target.value)}
            className={`${competitorinputStyle} `}
          >
            {classes
              ?.filter((item) => item.category === selectedCategory)
              .map((item, index) => (
                <option key={index} value={item.weight_class.id}>
                  {item.weight_class.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Вес:</div>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={competitorinputStyle}
          />
        </div>
        <div>
          <div className="my-1 text-sm text-lightblue-200">Команда:</div>
          <select className={`${competitorinputStyle} `}>
            <option>Нет</option>
          </select>
        </div>
      </div>
      <div className="mt-8">
        <ActionButton
          className="rounded-xl px-8 py-3 font-medium text-gray-600 md:w-[200px]"
          onClick={update}
        >
          Сохранить
        </ActionButton>
      </div>
    </div>
  )
}

export default RegistrationWindow
