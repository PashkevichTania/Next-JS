import {makeAutoObservable} from "mobx"

const isClient = typeof window !== "undefined"

export interface AuthState {
  isAuth: boolean
  name: string
}

const initialState: AuthState = {
  isAuth: isClient && !!localStorage.getItem("auth"),
  name: (isClient && localStorage.getItem("auth")) || "",
}

class Auth {
  constructor() {
    makeAutoObservable(this)
  }

  state = initialState

  set(state: AuthState){
    this.state = state
  }
  clear(){
    this.state = {
      isAuth: false,
      name: ""
    }
  }
}

export default new Auth()
