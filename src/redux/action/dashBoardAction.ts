import { createAsyncThunk } from "@reduxjs/toolkit";
import { dashBoardService } from "../../service";


export const getEventsList = createAsyncThunk(
  "/getEventsList",
  async () => {
    const response = await dashBoardService.getEventList()
    return response;
  }
);