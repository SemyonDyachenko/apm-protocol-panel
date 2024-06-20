export default interface WeightClass {
  id: number
  name: string
}

export interface WeightClassData {
  name: string
}

export interface TournamentWeightClass {
  id: number
  tournament: number
  weight_class: WeightClass
  category: string
  completed_left: boolean
  completed_right: boolean
  roundsCount: number
}
