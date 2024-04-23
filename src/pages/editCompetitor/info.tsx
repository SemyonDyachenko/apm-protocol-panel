import ActionButton from "@/components/UI/ActionButton"
import Competitor from "@/models/Competitor"
import { getNormalizeDate } from "@/utils/date"
import { getRoleString } from "@/utils/string"
import { competitorInputTitleStyle, competitorinputStyle } from "@/utils/styles"
import React from "react"

type Props = {
  competitor: Competitor
}

const CompetitorInfo = ({ competitor }: Props) => {
  return (
    <div className="w-full px-4 md:w-10/12 md:pb-5">
      <div className="grid w-full gap-8 md:grid-cols-3">
        <div>
          <div className={competitorInputTitleStyle}>Дата рождения:</div>
          <input
            value={
              competitor.birthdate
                ? getNormalizeDate(competitor.birthdate?.toString())
                : "Не указана"
            }
            disabled
            className={competitorinputStyle}
          />
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Страна:</div>
          <input
            value={competitor.country}
            disabled
            className={competitorinputStyle}
          />
        </div>

        <div>
          <div className={competitorInputTitleStyle}>Страна:</div>
          <input
            value={competitor.country}
            disabled
            className={competitorinputStyle}
          />
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Город:</div>
          <input
            value={competitor.city || "Не указан"}
            disabled
            className={competitorinputStyle}
          />
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Роль:</div>
          <input
            value={getRoleString(competitor.mode)}
            disabled
            className={competitorinputStyle}
          />
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Начало карьеры:</div>
          <input
            value={
              competitor.career_start_date
                ? getNormalizeDate(competitor.career_start_date?.toString())
                : "Не указана"
            }
            disabled
            className={competitorinputStyle}
          />{" "}
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Рост:</div>
          <input
            value={competitor.height + " См"}
            disabled
            className={competitorinputStyle}
          />
        </div>
        <div>
          <div className={competitorInputTitleStyle}>Вес:</div>
          <input
            value={competitor.weight + " Кг"}
            disabled
            className={competitorinputStyle}
          />
        </div>
      </div>
      <div className="mt-8">
        <ActionButton
          disabled
          className="rounded-xl bg-gray-400 px-8 py-3 font-medium text-gray-600 md:w-[200px]"
          onClick={() => {}}
        >
          Сохранить
        </ActionButton>
      </div>
    </div>
  )
}

export default CompetitorInfo
