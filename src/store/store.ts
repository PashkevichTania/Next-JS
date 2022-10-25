import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import filtersReducer from "./filtersSlice"
import authReducer from "./authSlice"

const makeStore = () =>
  configureStore({
    reducer: {
      filters: filtersReducer,
      auth: authReducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>

export default createWrapper<AppStore>(makeStore)
