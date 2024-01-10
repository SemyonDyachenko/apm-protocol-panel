import { $api } from "./instance"

export class API {
  static async getCompetitors() {
    await $api
      .get("competitors/")
      .then((response) => response.data)
      .then((data) => {
        return data
      })
      .then((error: Error | null) => {
        return { message: error?.message }
      })
    return null
  }

  static async getLeagues() {
    await $api
      .get("leagues/")
      .then((response) => response.data)
      .then((data) => {
        return data
      })
      .then((error: Error | null) => {
        console.log(error?.message)
        return { message: error?.message }
      })
    return null
  }

  static async getMatches() {
    await $api
      .get("matches/")
      .then((response) => response.data)
      .then((data) => {
        return data
      })
      .then((error: Error | null) => {
        console.log(error?.message)
        return { message: error?.message }
      })
    return null
  }
}
