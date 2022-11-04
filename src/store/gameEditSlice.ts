import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { GameData } from "@/utils/intefaces"
import { API } from "@/server/api"

export interface gameEditState {
  data: null | GameData,
  status: null | string,
  error: null | Error,
}

const initialState: gameEditState = {
  data: null,
  status: null,
  error: null,
}

export const fetchGame = createAsyncThunk(
  "api/games",
  async (id: string) => {
    return await API.fetchGameById(id)
  },
)

const gameAdapter = createEntityAdapter();

export const gameEditSlice = createSlice({
  name: "gameEdit",
  initialState: gameAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(fetchGame.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(fetchGame.fulfilled, (state, action) => {
        // Добавляем пользователя
        gameAdapter.addOne(state, action);
        state.status = 'idle';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(fetchGame.rejected, (state, action) => {
        state.status = 'failed';
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
        // @ts-ignore
        state.error = action.error;
      });
  },
})


export default gameEditSlice.reducer
