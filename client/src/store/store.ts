import { partiesReducer } from '@/dispatchers/party/partiesSlice';
import { usersReducer } from '@/dispatchers/user/usersSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    parties: partiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
