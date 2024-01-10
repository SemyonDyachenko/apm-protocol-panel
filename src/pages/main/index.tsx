import React, { useEffect, useState } from "react"
import {
  faBell,
  faGear,
  faHome,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CompetitorsSection from "../competitors"
import UpBar from "@/components/upBar"
import SidebarMenu, { SidebarItem } from "@/components/sidebar"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { useNavigate } from "react-router-dom"
import { logoutUser, refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"
import TournamentsPage from "../tournaments"

type Props = {}

const MainPage = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { competitor, loading } = useAppSelector((state) => state.competitors)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth")
    } else {
      try {
        dispatch(refreshLogin()).then(() => {
          dispatch(getCompetitorData(localStorage.getItem("token"))).then(
            (value) => {
              if (!value) {
                dispatch(logoutUser())
                navigate("/auth")
              }
            }
          )
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  const [targetWindow, setTargetWindow] = useState("tournaments")
  const [targetTitle, setTargetTitle] = useState("Турниры")

  let items: Array<SidebarItem> = [
    {
      title: "Турниры",
      onClick: () => {
        setTargetWindow("tournaments")
        setTargetTitle("Турниры")
      },
      icon: faHome,
      selected: true,
    },
    {
      title: "Спортсмены",
      onClick: () => {
        setTargetWindow("competitors")
        setTargetTitle("Спортсмены")
      },
      icon: faUser,
      selected: false,
    },
    {
      title: "Настройки",
      onClick: () => {
        setTargetWindow("settings")
        setTargetTitle("Настройки")
      },
      icon: faGear,
      selected: false,
    },
  ]

  const getTargetWindow = () => {
    switch (targetWindow) {
      case "tournaments":
        return <TournamentsPage />
      case "competitors":
        return <CompetitorsSection />
      case "settings":
        return <div>settings</div>
    }
  }

  return (
    <div className="h-screen w-screen bg-slate-200">
      <div className="flex">
        <SidebarMenu
          items={items}
          changeState={setTargetWindow}
          className="md:w-[15%]"
        />
        <div className="md:w-[85%]">
          <UpBar title={targetTitle} />
          <div>
            <div className="m-10">{getTargetWindow()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
