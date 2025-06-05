import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import dashBoardSlice from './slice/dashBoardSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashBoardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;