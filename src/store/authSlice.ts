import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface authState {
  isAuth: boolean
  name: string
}

const isClient = typeof window !== "undefined"

const initialState: authState = {
  isAuth: isClient && !!localStorage.getItem("auth"),
  name: (isClient && localStorage.getItem("auth")) || "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<authState>) => ({ ...action.payload }),
    clear: () => initialState,
  },
})

const { set, clear } = authSlice.actions

export const authActions = { set, clear }

export default authSlice.reducer
