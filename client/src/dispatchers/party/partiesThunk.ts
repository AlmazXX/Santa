import axiosApi from '@/axiosApi';
import {
  ApiParty,
  ApiResponse,
  GlobalError,
  IPagination,
  IParty,
  ValidationError,
} from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const getParties = createAsyncThunk<IPagination<ApiParty>>(
  'parties/get',
  async () => {
    const { data } = await axiosApi.get<ApiResponse<ApiParty>>('/parties');
    return data.result as IPagination<ApiParty>;
  },
);

export const createParty = createAsyncThunk<
  void,
  IParty,
  { rejectValue: ValidationError | GlobalError }
>('parties/create', async (party, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(party) as (keyof IParty)[];

    keys.forEach((key) => {
      const value = party[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const { data } = await axiosApi.post('/parties', formData);
    return data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      [400, 401, 403, 404].includes(error.response.status)
    ) {
      return rejectWithValue(
        error.response.data as ValidationError | GlobalError,
      );
    }
    throw error;
  }
});

export const getSingleParty = createAsyncThunk<ApiParty, string>(
  'parties/getSingle',
  async (partyId) => {
    const { data } = await axiosApi.get<ApiResponse<ApiParty>>(
      `/parties/${partyId}`,
    );
    return <ApiParty>data.result;
  },
);

export const deleteParty = createAsyncThunk(
  'parties/delete',
  async (id: string) => {
    await axiosApi.delete(`/parties/${id}`);
  },
);

export const editParty = createAsyncThunk<
  void,
  { id: string; party: IParty },
  { rejectValue: ValidationError | GlobalError }
>('parties/edit', async ({ id, party }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(party) as (keyof IParty)[];

    keys.forEach((key) => {
      const value = party[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const { data } = await axiosApi.put(`/parties/${id}`, formData);
    return data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      [400, 401, 403, 404].includes(error.response.status)
    ) {
      return rejectWithValue(
        error.response.data as ValidationError | GlobalError,
      );
    }
    throw error;
  }
});
