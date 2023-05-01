import { RootState } from '@/store/store';
import { GlobalError, User, ValidationError } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { googleLogin, login, logout, register } from './usersThunk';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  logout: boolean;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  logout: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
    cleanErrors: (state) => {
      state.loginError = null;
      state.registerError = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.registerError = null;
        state.registerLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload: user }) => {
        state.registerError = null;
        state.registerLoading = false;
        state.user = user;
      })
      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerLoading = false;
        state.registerError = error || null;
      })
      .addCase(login.pending, (state) => {
        state.loginError = null;
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload: user }) => {
        state.loginError = null;
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loginError = null;
        state.loginLoading = true;
        state.registerLoading = true;
      })
      .addCase(googleLogin.fulfilled, (state, { payload: user }) => {
        state.loginError = null;
        state.loginLoading = false;
        state.registerLoading = false;
        state.user = user;
      })
      .addCase(googleLogin.rejected, (state, { payload: error }) => {
        state.loginLoading = false;
        state.registerLoading = false;
        state.loginError = error || null;
      })
      .addCase(logout.pending, (state) => {
        state.logout = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logout = false;
      })
      .addCase(logout.rejected, (state) => {
        state.logout = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser, cleanErrors } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogout = (state: RootState) => state.users.logout;
