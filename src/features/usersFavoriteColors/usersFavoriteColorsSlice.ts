import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface UserWithColorInfo {
  // id: number | undefined
  name: string
  favoriteColorName: string
  favoriteColorHexValue: string
}

export interface UsersFavoriteColorsSliceState {
  value: UserWithColorInfo[]
  colors: string[]
  status: "idle" | "loading" | "failed"
}

const initialState: UsersFavoriteColorsSliceState = {
  value: [],
  colors: ["Red", "Orange", "Blue", "Purple"],
  status: "idle",
}

// colors:
// Red, Orange, Blue, Purple

export const usersFavoriteColorsSlice = createAppSlice({
  name: "usersFavoriteColors",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    addUser: create.reducer(
      (state, action: PayloadAction<UserWithColorInfo>) => {
        console.log("🚀 ~ action:", action.payload)
        state.value.push(action.payload)
      },
    ),
    deleteUser: create.reducer(
      (state, action: PayloadAction<UserWithColorInfo>) => {
        console.log("🚀 ~ action:", action.payload)
        state.value = state.value.filter(u => u.name !== action.payload.name)
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectUsers: users => users.value,
    selectColors: userState => userState.colors,
    selectStatus: users => users.status,
  },
})

// Action creators are generated for each case reducer function.
export const { addUser, deleteUser } = usersFavoriteColorsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUsers, selectColors } = usersFavoriteColorsSlice.selectors
