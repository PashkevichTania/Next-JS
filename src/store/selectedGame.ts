import {runInAction, makeAutoObservable} from "mobx"
import { GameData } from "@/utils/intefaces"

export interface gameEditState {
  game: null | GameData
  isLoading: boolean
  error: null | string
}

const initialState: gameEditState = {
  game: null,
  isLoading: false,
  error: null,
}

class SelectedGames {
  constructor() {
    makeAutoObservable(this)
  }

  state = initialState

  async fetchGame(id: string){
    this.state.isLoading = true
    try {
      const response = await fetch(`api/games/${id}`)
      const {result} = await response.json()
      runInAction(() => {
        this.state.game = result
        this.state.error = null
      })
    } catch (error) {
      runInAction(() => {
        this.state.error = "Error while fetching game"
      })
    }finally {
      this.state.isLoading = false
    }
  }
  clear(){
    this.state = initialState
  }
}

export default new SelectedGames()
