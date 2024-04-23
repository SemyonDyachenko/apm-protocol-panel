import ActionButton from "@/components/UI/ActionButton"
import Competitor from "@/models/Competitor"
import { competitorInputTitleStyle, competitorinputStyle } from "@/utils/styles"

type Props = {
  competitor: Competitor
}

const CompetitorStats = ({ competitor }: Props) => {
  const competitorStats = [
    {
      title: "Хват",
      value: competitor.grip + " Кг",
    },
    {
      title: "Бицепс",
      value: competitor.biceps + " Кг",
    },
    {
      title: "Турник",
      value: competitor.crossbar + " Раз",
    },
    {
      title: "Луч",
      value: competitor.shaft + " Кг",
    },
    {
      title: "Армжим",
      value: competitor.militarypress + " Кг",
    },
    {
      title: "Кисть",
      value: competitor.hand + " Кг",
    },
    {
      title: "Жим",
      value: competitor.press + " Кг",
    },
    {
      title: "Бок",
      value: competitor.side + " Кг",
    },
  ]

  return (
    <div className="w-full px-4 md:w-10/12 md:pb-5">
      <div className="grid w-full gap-8 md:grid-cols-4">
        {competitorStats.map((item, index) => (
          <div>
            <div className={competitorInputTitleStyle}>{item.title}:</div>
            <input
              value={item.value}
              disabled
              className={competitorinputStyle}
            />
          </div>
        ))}
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

export default CompetitorStats
