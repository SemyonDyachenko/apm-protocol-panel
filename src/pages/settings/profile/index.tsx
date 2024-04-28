import { CompetitorData } from "@/store/slices/competitorSlice"
import CustomInput from "@/components/UI/CustomInput"

type Props = {
  competitor: CompetitorData
}
const ProfileSettings = ({ competitor }: Props) => {
  return (
    <div className="mt-8 max-w-full">
      <div className="w-full">
        <div></div>
        <div className="w-3/6">
          <div className="grid w-full grid-cols-2 gap-8">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
