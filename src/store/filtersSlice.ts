import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

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

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<FiltersState>) => ({ ...action.payload }),
    update: (state, action: PayloadAction<Partial<FiltersState>>) => ({
      ...state,
      ...action.payload,
    }),
    clear: () => initialState,
  },
})

const { set, update, clear } = filtersSlice.actions

export const filtersActions = { set, update, clear }

export default filtersSlice.reducer
