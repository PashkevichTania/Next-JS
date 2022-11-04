import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import filtersReducer from "./filtersSlice"
import authReducer from "./authSlice"
import gameEditReducer from "src/store/gameEditSlice"

const makeStore = () =>
  configureStore({
    reducer: {
      filters: filtersReducer,
      auth: authReducer,
      gameEdit: gameEditReducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export default createWrapper<AppStore>(makeStore)
