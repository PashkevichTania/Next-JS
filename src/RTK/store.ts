import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import filtersReducer from "./filtersSlice"

const makeStore = () =>
  configureStore({
    reducer: {
      [filtersReducer.name]: filtersReducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>

export default createWrapper<AppStore>(makeStore)
