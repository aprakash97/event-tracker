import type { AxiosError } from "axios";
import { API_MESSAGES } from "../utilities/constants";
import type { APIErrorMessage, DashboardTileDto } from "../utilities/models";
import { privateApiInstance } from ".";

async function getEventList() {
  try {
    const response = await privateApiInstance.get<DashboardTileDto[]>('dashboardItems.json');
    return response.data;
  } catch (error) {
    throw new Error(
      (error as AxiosError<APIErrorMessage>).response?.data.message || API_MESSAGES.FAILED_GET,
    );
  }
}

export const dashBoardService = {
    getEventList
}