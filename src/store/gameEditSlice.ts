import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GameData } from "@/utils/intefaces"

export interface gameEditState {
  game: null | GameData
  isLoading: boolean
  error: null | string
}

type FetchError = {
  message: string
}

const initialState: gameEditState = {
  game: null,
  isLoading: false,
  error: null,
}

export const fetchGame = createAsyncThunk<GameData, string, { rejectValue: FetchError }>(
  "api/games",
  async (id: string, thunkApi) => {
    const response = await fetch(`api/games/${id}`)

    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: "Failed to fetch todos.",
      })
    }
    const { result } = await response.json()
    return result
  }
)

export const clearState = createAction("clearState")

export const gameEditSlice = createSlice({
  name: "gameEdit",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clearState, () => initialState)
      .addCase(fetchGame.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchGame.fulfilled, (state, action) => {
        state.game = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchGame.rejected, (state, action) => {
        if (action.payload) state.error = action.payload.message
        state.isLoading = false
      })
  },
})

export default gameEditSlice.reducer
