import axiosApi from '@/axiosApi';
import {
  ApiResponse,
  GlobalError,
  ILogin,
  IRegister,
  User,
  ValidationError,
} from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';

export const register = createAsyncThunk<
  User,
  IRegister,
  { rejectValue: ValidationError }
>('users/register', async (user, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(user) as (keyof IRegister)[];

    keys.forEach((key) => {
      const value = user[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const { data } = await axiosApi.post<ApiResponse<User>>('/users', formData);
    return data.result as User;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  User,
  ILogin,
  { rejectValue: GlobalError }
>('users/login', async (user, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<ApiResponse<User>>(
      '/users/sessions',
      user,
    );
    return data.result as User;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const googleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: GlobalError }
>('users/googleLogin', async (credential, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<ApiResponse<User>>('/users/google', {
      credential,
    });
    return data.result as User;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const logout = createAsyncThunk(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete('/users/sessions');
    dispatch(unsetUser());
  },
);
