export const getNormalizeDate = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return formattedDate.toString()
}
export const getNormalizeDateTime = (dateString: string) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
  })
  const formattedTime = date.toLocaleTimeString("ru-RU", { timeStyle: "short" })
  return formattedDate.toString() + " " + formattedTime.toString()
}
