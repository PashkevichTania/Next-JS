import {makeAutoObservable} from "mobx"

export interface FiltersState {
  title: string
  ratingCritics: number
  ratingUsers: number
  releaseDate: Date | null
  sort: boolean
}

const initialState: FiltersState = {
  title: "",
  ratingCritics: 0,
  ratingUsers: 0,
  releaseDate: null,
  sort: false,
}
class Filters {
  constructor() {
    makeAutoObservable(this)
  }

  state = initialState

  set(filters: FiltersState){
    this.state = filters
  }
  update(updates: Partial<FiltersState>){
    this.state = {
      ...this.state,
      ...updates,
    }
  }
  clear(){
    this.state = initialState
  }
}

export default new Filters()
