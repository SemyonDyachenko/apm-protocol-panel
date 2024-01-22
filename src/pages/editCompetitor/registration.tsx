import ActionButton from "@/components/UI/ActionButton"
import { useAppDispatch } from "@/hooks/redux"
import { getCompetitorGender } from "@/models/Competitor"
import { TournamentRegistration } from "@/models/Tournament"
import { weightClassAPI } from "@/services/weightClassService"
import { updateTournamentRegistration } from "@/store/actions/tournamentAction"
import { getCategoryString, tournamentCategoires } from "@/utils/string"
import React, { useState } from "react"

type Props = {
  competitor: TournamentRegistration
}

const RegistrationWindow = ({ competitor }: Props) => {
  const dispatch = useAppDispatch()
  const titleStyle = "text-sm text-lightblue-200 my-1"
  const inputStyle =
    "w-full py-3 px-4 bg-white disabled:bg-lightblue-100 border-lightblue-200 border-[1px] outline-none rounded-2xl text-lightblue-200"

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
          <div className={titleStyle}>Пол:</div>
          <input
            disabled
            defaultValue={getCompetitorGender(competitor.competitor) || ""}
            className={inputStyle}
          />
        </div>
        <div>
          <div className={titleStyle}>Категория:</div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`${inputStyle} `}
          >
            {tournamentCategoires.map((item, index) => (
              <option key={index} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className={titleStyle}>Оплата:</div>
          <select
            value={paid.toString()}
            onChange={(e) => setPaid(e.target.value === "true")}
            className={inputStyle}
          >
            <option value={"true"}>Оплачен</option>

            <option value={"false"}>Не оплачен</option>
          </select>
        </div>
        <div>
          <div className={titleStyle}>Статус:</div>
          <select
            value={confirm.toString()}
            onChange={(e) => setConfirm(e.target.value === "true")}
            className={inputStyle}
          >
            <option value={"true"}>Подтвержден</option>

            <option value={"false"}>Не подтвержден</option>
          </select>
        </div>
        <div>
          <div className={titleStyle}>Рука:</div>
          <select
            value={hand}
            onChange={(e) => setHand(e.target.value)}
            className={inputStyle}
          >
            <option value="left">Левая</option>

            <option value="right">Правая</option>
          </select>
        </div>
        <div>
          <div className={titleStyle}>Весовая категория:</div>
          <select
            value={selectedWeightClass}
            onChange={(e) => setSelectedWeightClass(+e.target.value)}
            className={`${inputStyle} `}
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
          <div className={titleStyle}>Вес:</div>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          <div className="my-1 text-sm text-lightblue-200">Команда:</div>
          <select className={`${inputStyle} `}>
            <option>Нет</option>
          </select>
        </div>
      </div>
      <div className="mt-8">
        <ActionButton
          className="rounded-xl px-24 py-3 font-medium"
          onClick={update}
        >
          Сохранить
        </ActionButton>
      </div>
    </div>
  )
}

export default RegistrationWindow
