import ReturnLine from "@/components/returnLine"
import UpMenu, { upMenuItem } from "@/components/upMenu"
import React, { useEffect, useState } from "react"
import DocItem from "@/pages/docs/docItem"
import { faList, faUser } from "@fortawesome/free-solid-svg-icons"
import { competitorAPI } from "@/services/competitorService"
import { handleDownloadJson } from "@/utils/files"
import { leagueAPI } from "@/services/leaugeService"

type Props = {}

const items: Array<upMenuItem> = [
  {
    title: "Отчеты",
    selected: true,
    target: "reports",
  },
  {
    title: "Файлы",
    target: "files",
  },
  {
    title: "Протоколы",
    target: "protocols",
  },
]

const DocsPage = (props: Props) => {
  const { data: competitors } = competitorAPI.useFetchAllCompetitorQuery(100)
  const { data: leagues } = leagueAPI.useFetchAllLeaguesQuery(100)

  const [fileFormat, setFileFormat] = useState(
    localStorage.getItem("apm_files_download_format") || "json"
  )

  useEffect(() => {
    localStorage.setItem("apm_files_download_format", fileFormat)
  }, [fileFormat])

  const [target, setTarget] = useState("reports")
  return (
    <div className="w-full ">
      <div className="w-full rounded-2xl bg-white p-10">
        <div>
          <ReturnLine className="" />
        </div>

        <div>
          <div className="my-8 text-3xl font-semibold text-lightblue-200">
            Отчеты и файлы
          </div>
        </div>
        <div>
          <UpMenu changeTarget={setTarget} items={items} />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className=" text-sm text-gray-400">Формат файлов:</div>
          <div>
            <select
              value={fileFormat}
              onChange={(e) => setFileFormat(e.target.value)}
              className="rounded-lg border-[1px] border-gray-200 bg-white px-4 py-1 font-medium text-gray-600 outline-none"
            >
              <option value={"json"} className="text-sm font-medium">
                JSON
              </option>
              <option value={"exel"} className="text-sm font-medium">
                Exel
              </option>
              <option value={"pdf"} className="text-sm font-medium">
                PDF
              </option>
              <option value={"word"} className="text-sm font-medium">
                Word
              </option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 py-4">
          {competitors && (
            <DocItem
              onClick={() => handleDownloadJson(competitors, "competitors")}
              logo={faUser}
              title={"Количество:"}
              subtitle={competitors.length + " СПОРТСМЕНОВ"}
            />
          )}
          {leagues && (
            <DocItem
              onClick={() => handleDownloadJson(leagues, "leagues")}
              logo={faList}
              title={"Список лиг:"}
              subtitle={"ЛЮБИТЕЛЬСКИЕ ЛИГИ"}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DocsPage
