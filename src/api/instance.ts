import axios from "axios"

export const DEBUG = process.env.NODE_ENV === "development"

const BASE_URL = DEBUG
  ? "http://127.0.0.1:8000/api/"
  : "https://apm-tech.ru/api/"

export const $api = axios.create({
  baseURL: BASE_URL,
})

export const SERVER_URL = DEBUG
  ? "http://127.0.0.1:8000/api"
  : "https://apm-tech.ru/api"
