import type { DashboardTileDto } from "../models"

export interface DashboardStateProps {
    stateNumber: number
    isLoading: boolean
    hasError: boolean
    eventListData: DashboardTileDto[]
    eventListFilterData: DashboardTileDto[]
    hostData: string[]
    totalPages: number
    attendees?: string[]
}