import ReturnLine from "@/components/returnLine"
import UpMenu, { upMenuItem } from "@/components/upMenu"
import React, { useEffect, useState } from "react"

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


  return (
    <div>
      <div className="w-full rounded-xl bg-white  px-10 py-5">
        <div>
          <ReturnLine className="py-4" />
        </div>
        <div className="mt-8 px-2">
          <UpMenu items={items} changeTarget={setTarget} />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
