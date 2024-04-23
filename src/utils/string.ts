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

export const tournamentCategories = [
  {
    title: "Мужчины",
    value: "men",
  },
  {
    title: "Женщины",
    value: "women",
  },
  {
    title: "Юниоры 18+",
    value: "juniors18",
  },
  {
    title: "Юниоры 21+",
    value: "juniors21",
  },
  {
    title: "Ветераны",
    value: "old",
  },
]

export const getRoleString = (role: string) => {
  return Roles.find((item) => item.value === role)?.title
}

export const getCategoryString = (category: string) => {
  return tournamentCategories.find((item) => item.value === category)?.title
}

export const getRoundStatus = (status: string) => {
  switch (status) {
    case "midifinal":
      return "Полуфинал"
    case "final":
      return "Финал"
    case "superfinal":
      return "Супер Финал"
    default:
      return ""
  }
}
