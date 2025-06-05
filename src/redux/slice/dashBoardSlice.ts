import { createSlice } from "@reduxjs/toolkit";
import type { DashboardTileDto } from "../../utilities/models";
import { getEventsList } from "../action/dashBoardAction";

export interface initialStateProps {
  stateNumber: number
  isLoading: boolean
  hasError: boolean
  eventListData: DashboardTileDto[]
}

const initialState: initialStateProps = {
  stateNumber: 0,
  isLoading: false,
  hasError: false,
  eventListData: []
};


export const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setStateNumber: (state) => {
      state.stateNumber = state.stateNumber + 1
    },
    resetState: (state) => {
      state.stateNumber = initialState.stateNumber
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getEventsList.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getEventsList.fulfilled, (state, action) => {
        state.eventListData = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getEventsList.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
  },
});

export const {
  setStateNumber,
  resetState
} = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
