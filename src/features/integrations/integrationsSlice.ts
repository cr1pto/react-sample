import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { fetchIntegrations } from "./integrationsAPI"

export type IntegrationMetadata = {
  id: string
  name: string
  description: string
  url: string
}

export interface IntegrationsSliceState {
  value: IntegrationMetadata[]
  status: "idle" | "loading" | "failed"
}

const initialState: IntegrationsSliceState = {
  value: [],
  status: "idle",
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const integrationsSlice = createAppSlice({
  name: "integrations",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    updateMetadata: create.reducer(
      (state, action: PayloadAction<IntegrationMetadata[]>) => {
        state.value = action.payload
      },
    ),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    getIntegrationsAsync: create.asyncThunk(
      async () => {
        const response = await fetchIntegrations()
        console.log("🚀 ~ response:", response)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.value = action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectIntegrations: integrations => integrations.value,
    selectStatus: integrations => integrations.status,
  },
})

// Action creators are generated for each case reducer function.
export const { updateMetadata, getIntegrationsAsync } =
  integrationsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectIntegrations } = integrationsSlice.selectors
