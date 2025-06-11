import { createSlice } from "@reduxjs/toolkit";
import { type DashboardTileDto } from "../../utilities/models";
import type { DashboardStateProps } from "../../utilities/interfaces";
import { getEventsList } from "../action/dashboardAction";

const initialState: DashboardStateProps = {
  stateNumber: 0,
  isLoading: false,
  hasError: false,
  eventListData: [],
  eventListFilterData: [],
  hostData: [],
  currentPage: 1,
  totalPages: 0,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setStateNumber: (state) => {
      state.stateNumber = state.stateNumber + 1
    },
    resetState: (state) => {
      state.stateNumber = initialState.stateNumber
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getEventsList.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getEventsList.fulfilled, (state, action) => {
        state.eventListData = action.payload.items;
        // state.eventListFilterData = action.payload;
        state.totalPages = action.payload.totalCount
        state.hostData = action.payload.fullList.map((data: DashboardTileDto) => data.host).filter((value, index, self) => self.indexOf(value) === index)
        state.totalPages = Math.ceil(action.payload.totalCount / 5)
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
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
