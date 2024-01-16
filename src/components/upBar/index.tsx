import { CompetitorData } from "@/store/slices/competitorSlice"
import { faBell, faGear, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NonImage from "/assets/utils/nonuserimage.jpg"
import { useAppSelector } from "@/hooks/redux"
import ProfilePopup from "../profilePopup"
import { useState } from "react"
import SearchPopup from "../searchPopup"
import { Link } from "react-router-dom"

type Props = {
  title: string
}

const UpBar = ({ title }: Props) => {
  const [profilePopup, setProfilePopup] = useState(false)
  const [searchPopup, setSearchPopup] = useState(false)

  const { competitor, loading } = useAppSelector((state) => state.competitors)

  return (
    <div className="fixed left-[15%] h-[100px] w-[85%] border-[0.5px] border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-10 py-4">
        <div className="text-xl font-semibold text-gray-700">{title}</div>
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center">
              <FontAwesomeIcon
                className="text-md rounded-l-full bg-lightblue-100 py-3 pl-6 text-lightblue-200"
                icon={faSearch}
              />
              <input
                onFocus={() => setSearchPopup(!searchPopup)}
                className="rounded-r-full bg-lightblue-100 px-4 py-2 text-lightblue-200
            outline-none placeholder:text-lightblue-200  md:w-[300px]"
                placeholder="Поиск турниров"
              />
            </div>
            <SearchPopup
              active={searchPopup}
              closeFunc={() => setSearchPopup(false)}
            />
          </div>
          <div>
            <Link to="/settings">
              <div className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-lightblue-100 text-lightblue-200 transition hover:bg-secondary-500 hover:text-white">
                <FontAwesomeIcon className="text-xl" icon={faGear} />
              </div>
            </Link>
          </div>
          <div>
            <div className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-lightblue-100 text-primary-200 transition hover:bg-secondary-500 hover:text-white">
              <FontAwesomeIcon className="text-xl" icon={faBell} />
            </div>
          </div>
          <div onClick={() => setProfilePopup(!profilePopup)}>
            <div className="mx-4 cursor-pointer rounded-full">
              <img
                className="h-[55px] w-[55px] rounded-full border-[1px] "
                src={
                  "https://apm-tech.ru/media/competitors_userpictures/photo_zepTaR7.jpg"
                }
              />
            </div>
          </div>
        </div>
      </div>
      {competitor && (
        <ProfilePopup
          competitor={competitor}
          active={profilePopup}
          closeFunc={() => setProfilePopup(false)}
        />
      )}
    </div>
  )
}

export default UpBar
