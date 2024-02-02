import React, { useEffect, useState } from "react"
import {
  faBell,
  faDisplay,
  faFile,
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
import { Outlet, useNavigate } from "react-router-dom"
import { logoutUser, refreshLogin } from "@/store/actions/authAction"
import { getCompetitorData } from "@/store/actions/competitorAction"
import TournamentsPage from "../tournaments"

type Props = {}

const MainPage = (props: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!localStorage.getItem("apm_protocols_token")) {
      navigate("/auth")
    } else {
      try {
        dispatch(refreshLogin()).then(() => {
          dispatch(
            getCompetitorData(localStorage.getItem("apm_protocols_token"))
          ).then((value) => {
            if (!value) {
              dispatch(logoutUser())
              navigate("/auth")
            }
          })
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [])
  const [targetTitle, setTargetTitle] = useState("Турниры")

  let items: Array<SidebarItem> = [
    {
      title: "Турниры",
      onClick: () => {
        setTargetTitle("Турниры")
      },
      icon: faHome,
      selected: true,
      link: "/",
    },
    {
      title: "Спортсмены",
      onClick: () => {
        setTargetTitle("Спортсмены")
      },
      icon: faUser,
      selected: false,
      link: "/competitors",
    },
    {
      title: "Трансляция",
      onClick: () => {
        setTargetTitle("Трансляция")
      },
      icon: faDisplay,
      selected: false,
      link: "/streams",
    },
    {
      title: "Отчеты",
      onClick: () => {
        setTargetTitle("Отчеты")
      },
      icon: faFile,
      selected: false,
      link: "/docs",
    },
    {
      title: "Настройки",
      onClick: () => {
        setTargetTitle("Настройки")
      },
      icon: faGear,
      selected: false,
      link: "/settings",
    },
  ]

  return (
    <div className="max-w-screen min-h-screen  bg-slate-200">
      <div className="flex w-full">
        <SidebarMenu items={items} className="fixed" />
        <div className="ml-[10%] w-[90%] md:ml-[15%] md:w-[85%]">
          <UpBar title={targetTitle} />
          <div className="mt-[100px] w-full">
            <div className="w-full p-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
