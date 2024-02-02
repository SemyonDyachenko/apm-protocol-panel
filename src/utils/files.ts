export const handleDownloadJson = (data: Array<any>, fileName: string) => {
  const jsonCompetitors = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonCompetitors], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const anchorElement = document.createElement("a")
  anchorElement.href = url
  anchorElement.download = fileName.trim() + ".json"
  document.body.appendChild(anchorElement)
  anchorElement.click()
  document.body.removeChild(anchorElement)
  URL.revokeObjectURL(url)
}
