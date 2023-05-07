import axiosApi from '@/axiosApi';
import { ApiParty, ApiResponse, IPagination } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getParties = createAsyncThunk<IPagination<ApiParty>>(
  'parties/get',
  async () => {
    const { data } = await axiosApi.get<ApiResponse<ApiParty>>('/parties');
    return data.result as IPagination<ApiParty>;
  },
);
