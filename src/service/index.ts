import axios from "axios";

export const privateApiInstance = axios.create();

privateApiInstance.interceptors.response.use(
    response => { return response; },
    error => { return Promise.reject(error); }
);

export * from './dashBoardService';