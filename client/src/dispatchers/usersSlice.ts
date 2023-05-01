import { createSlice } from '@reduxjs/toolkit';

interface UsersState {
  loading: boolean;
}

const initialState: UsersState = {
  loading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const usersReducer = usersSlice.reducer;
