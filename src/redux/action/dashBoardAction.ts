import { createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardService } from "../../service";

export const getEventsList = createAsyncThunk(
  "/getEventsList",
  async ({ page }: { page: number }) => {
    const limit = 5;

    //for loader
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await dashboardService.getEventList()
    // return response;

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedItems = response.slice(start, end);

    return {
      items: paginatedItems,
      totalCount: response.length,
      fullList: response
    };
  }
);