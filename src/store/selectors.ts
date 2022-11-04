import { AppState } from "./store"

export const filtersSelector = (state: AppState) => state.filters
export const authSelector = (state: AppState) => state.auth
export const gameEditSelector = (state: AppState) => state.gameEdit.game
export const gameEditLoadingSelector = (state: AppState) => state.gameEdit.isLoading
