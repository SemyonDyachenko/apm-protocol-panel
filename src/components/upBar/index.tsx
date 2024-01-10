import { CompetitorData } from "@/store/slices/competitorSlice"
import { faBell, faGear, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NonImage from "/assets/utils/nonuserimage.jpg"
import { useAppSelector } from "@/hooks/redux"

type Props = {
  title: string
}

const UpBar = ({ title }: Props) => {
  const { competitor, loading } = useAppSelector((state) => state.competitors)

  return (
    <div className="h-[100px] w-full border-[0.5px] border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-10 py-4">
        <div className="text-xl font-semibold text-gray-700">{title}</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <FontAwesomeIcon
              className="text-md rounded-l-full bg-lightblue-100 py-3 pl-6 text-lightblue-200"
              icon={faSearch}
            />
            <input
              className="rounded-r-full bg-lightblue-100 px-4 py-2 text-lightblue-200
            outline-none placeholder:text-lightblue-200  md:w-[300px]"
              placeholder="Поиск турниров"
            />
          </div>
          <div>
            <div className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-lightblue-100 text-lightblue-200 transition hover:bg-secondary-500 hover:text-white">
              <FontAwesomeIcon className="text-xl" icon={faGear} />
            </div>
          </div>
          <div>
            <div className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-lightblue-100 text-primary-200 transition hover:bg-secondary-500 hover:text-white">
              <FontAwesomeIcon className="text-xl" icon={faBell} />
            </div>
          </div>
          <div onClick={() => {}}>
            <div className="mx-4 cursor-pointer rounded-full">
              <img
                className="h-[65px] w-[65px] rounded-full border-[1px] "
                src={competitor?.image?.toString() || NonImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpBar
