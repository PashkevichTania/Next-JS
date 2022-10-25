import { AppState } from "./store"

export const filtersSelector = (state: AppState) => state.filters
export const authSelector = (state: AppState) => state.auth
