import { CompetitorData } from "@/store/slices/competitorSlice"
import CustomInput from "@/components/UI/CustomInput"
import ActionButton from "@/components/UI/ActionButton"

type Props = {
  competitor: CompetitorData
}
const ProfileSettings = ({ competitor }: Props) => {
  return (
    <div className="mt-8 max-w-full">
      <div className="flex w-full gap-x-12">
        <div>
          <div className="pb-2 text-sm text-lightblue-200">Изображение:</div>
          <img
            className="h-[280px] w-[220px] rounded-xl border-[0.1px] border-gray-80"
            src={competitor.image?.toString()}
          />
        </div>
        <div className="w-3/6">
          <div className="grid w-full grid-cols-2 gap-4">
            <div>
              <div className="pb-1 text-sm text-lightblue-200">Имя:</div>
              <CustomInput
                className="rounded-xl py-[10px] md:w-full"
                value={competitor.first_name}
                onChange={() => {}}
                type={"text"}
              />
            </div>
            <div>
              <div className="pb-1 text-sm text-lightblue-200">Фамилия:</div>
              <CustomInput
                className="rounded-xl py-[10px] md:w-full"
                value={competitor.last_name}
                onChange={() => {}}
                type={"text"}
              />
            </div>
            <div>
              <div className="pb-1 text-sm text-lightblue-200">Фамилия:</div>
              <CustomInput
                className="rounded-xl py-[10px] md:w-full"
                value={competitor.last_name}
                onChange={() => {}}
                type={"text"}
              />
            </div>
            <div>
              <div className="pb-1 text-sm text-lightblue-200">Фамилия:</div>
              <CustomInput
                className="rounded-xl py-[10px] md:w-full"
                value={competitor.last_name}
                onChange={() => {}}
                type={"text"}
              />
            </div>
            <div>
              <div className="pb-1 text-sm text-lightblue-200">Фамилия:</div>
              <CustomInput
                className="rounded-xl py-[10px] md:w-full"
                value={competitor.last_name}
                onChange={() => {}}
                type={"text"}
              />
            </div>
            <div>
              <div className="pb-1 text-sm text-lightblue-200">Фамилия:</div>
              <CustomInput
                className="rounded-xl py-[10px] md:w-full"
                value={competitor.last_name}
                onChange={() => {}}
                type={"text"}
              />
            </div>
            <div>
              <ActionButton
                className="w-[250px px-12 py-3 font-medium text-gray-600"
                onClick={() => {}}
              >
                Сохранить изменения
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
