import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import {
  addIntegration,
  fetchIntegrationById,
  fetchIntegrations,
  filterIntegrationByName,
  toggleActiveStatus,
} from "./integrationsAPI"

export interface IntegrationMetadata {
  id: number | undefined
  name: string
  description: string
  active: boolean
  logo: string
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
    getIntegrationByIdAsync: create.asyncThunk(
      async (id: number) => {
        const response: IntegrationMetadata = await fetchIntegrationById(id)

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.value = [...state.value, action.payload]
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    addNewIntegration: create.asyncThunk(
      async (item: IntegrationMetadata) => {
        const response: IntegrationMetadata = await addIntegration(item)

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.value = [...state.value, action.payload]
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    toggleActiveStatusAsync: create.asyncThunk(
      async (id: number) => {
        const item = await fetchIntegrationById(id)
        const response: IntegrationMetadata = await toggleActiveStatus(
          id,
          !item?.active,
        )

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.value = [...state.value, action.payload]
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    getIntegrationsAsync: create.asyncThunk(
      async () => {
        const response: IntegrationMetadata[] = await fetchIntegrations()

        return response
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
    filterByName: create.asyncThunk(
      async (name: string) => {
        if (name.length < 1) {
          return []
        }
        const response = await filterIntegrationByName(name)
        console.log("🚀 ~ response:", response)
        // The value we return becomes the `fulfilled` action payload
        return response
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
export const {
  addNewIntegration,
  updateMetadata,
  getIntegrationByIdAsync,
  toggleActiveStatusAsync,
  getIntegrationsAsync,
  filterByName,
} = integrationsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectIntegrations } = integrationsSlice.selectors
