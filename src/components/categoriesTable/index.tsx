import { TournamentWeightClass } from "@/models/WeightClass"
import ModalWindow from "../modals/modalWindow"
import { getCategoryString } from "@/utils/string"
import ActionButton from "../UI/ActionButton"
import { removeMatchesFromCategory } from "@/store/actions/matchAction"
import { useAppDispatch } from "@/hooks/redux"
import { completeTournamentWeightClass } from "@/store/actions/tournamentAction"

type Props = {
  hidden: boolean
  closeFunc: () => void
  classes: TournamentWeightClass[]
}

const CategoriesTable = ({ hidden, closeFunc, classes }: Props) => {
  const dispatch = useAppDispatch()

  const clearCategoryRounds = (
    id: number,
    selectedHand: string,
    category: string,
    tournamentId: number,
    weightClassId: number
  ) => {
    dispatch(
      removeMatchesFromCategory(
        selectedHand,
        category,
        tournamentId,
        weightClassId
      )
    ).then((res) => {
      if (res && res.status == 200) {
        dispatch(completeTournamentWeightClass(id, false, selectedHand)).then(
          (result) => {
            window.location.reload()
          }
        )
      }
    })
  }

  return (
    <ModalWindow
      hidden={hidden}
      closeFunc={closeFunc}
      title="Категории турнира"
    >
      <div className="mx-10 mt-8 grid max-h-[500px] grid-cols-5 gap-8 overflow-y-scroll pb-8">
        {classes.map((item, index) => (
          <div>
            <div
              className="h-[180px] rounded-lg border-[1px] border-lightblue-200 bg-lightblue-100 p-4 md:w-[160px]"
              key={index}
            >
              <div className="text-lg font-medium text-lightblue-200">
                {getCategoryString(item.category)}
              </div>
              <div className="text-2xl font-semibold text-lightblue-200">
                {item.weight_class.name} КГ
              </div>
              <div className="text-lightblue-200">Правая рука</div>
              <div className="font-medium text-green-500">
                {item.completed_right && "ЗАВЕРШЕНА"}
              </div>
              <div>
                {item.completed_right && (
                  <ActionButton
                    className="text-md mt-2 w-full py-[4px] text-gray-600"
                    onClick={() =>
                      clearCategoryRounds(
                        item.id,
                        "right",
                        item.category,
                        item.tournament,
                        item.weight_class.id
                      )
                    }
                  >
                    Сбросить
                  </ActionButton>
                )}
              </div>
            </div>
            <div
              className="mt-1 h-[180px] rounded-lg border-[1px] border-lightblue-200 bg-lightblue-100 p-4 md:w-[160px]"
              key={index}
            >
              <div className="text-lg font-medium text-lightblue-200">
                {getCategoryString(item.category)}
              </div>
              <div className="text-2xl font-semibold text-lightblue-200">
                {item.weight_class.name} КГ
              </div>
              <div className="text-lightblue-200">Левая рука</div>
              <div className="font-medium text-green-500">
                {item.completed_left && "ЗАВЕРШЕНА"}
              </div>
              <div>
                {item.completed_left && (
                  <ActionButton
                    className="text-md mt-2 w-full py-[4px] text-gray-600"
                    onClick={() =>
                      clearCategoryRounds(
                        item.id,
                        "left",
                        item.category,
                        item.tournament,
                        item.weight_class.id
                      )
                    }
                  >
                    Сбросить
                  </ActionButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ModalWindow>
  )
}

export default CategoriesTable
