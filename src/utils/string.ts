export const Roles = [
  {
    value: "competitor",
    title: "Cпортсмен",
  },
  {
    value: "admin",
    title: "Администратор",
  },
  {
    value: "organizer",
    title: "Организатор",
  },
  {
    value: "secretary",
    title: "Секретарь",
  },
  {
    value: "judge",
    title: "Судья",
  },
]

export const getRoleString = (role: string) => {
  return Roles.find((item) => item.value === role)?.title
}
