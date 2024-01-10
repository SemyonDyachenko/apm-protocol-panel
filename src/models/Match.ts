export default interface Match {
  id?: number
  hand: string
  tournament: number
  first_competitor: number
  second_competitor: number
  winner?: number
  weight_class: number
  date: string
  round: number
}
