import ReturnLine from "@/components/returnLine"
import UpMenu, { upMenuItem } from "@/components/upMenu"
import React, { useEffect, useState } from "react"
import ProfileSettings from "@/pages/settings/profile"

type Props = {}

const items: Array<upMenuItem> = [
  {
    title: "Профиль",
    target: "profile",
    selected: true,
  },
  {
    title: "Система",
    target: "system",
  },
  {
    title: "Безопасность",
    target: "security",
  },
]

const SettingsPage = (props: Props) => {
  const [target, setTarget] = useState("profile")

  const getWindow = () => {
    switch (target) {
      case "profile":
        return <ProfileSettings />
    }
  }

  return (
    <div>
      <div className="w-full rounded-xl bg-white  px-10 py-5">
        <div>
          <ReturnLine className="py-4" />
        </div>
        <div>
          <div className="my-8 text-3xl font-semibold text-lightblue-200">
            Параметры и Безопасность
          </div>
        </div>
        <div className="mt-8 px-2">
          <UpMenu items={items} changeTarget={setTarget} />
        </div>
        <div>{getWindow()}</div>
      </div>
    </div>
  )
}

export default SettingsPage
