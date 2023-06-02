import axiosApi from '@/axiosApi';
import { AppDispatch, RootState } from '@/store/store';
import {
  ApiParticipant,
  ApiResponse,
  IPagination,
  IParticipant,
  SearchParam,
  ValidationError,
} from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

type ParticipantsQuery = SearchParam<
  Pick<ApiParticipant, 'user' | 'party' | 'victim'>
>;

export const getParticipants = createAsyncThunk<
  IPagination<ApiParticipant>,
  ParticipantsQuery,
  { state: RootState; dispatch: AppDispatch }
>('participants/get', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<ApiParticipant>>(
    '/participants',
    { params },
  );
  const { result } = <{ result: IPagination<ApiParticipant> }>data;

  return result;
});

export const joinParty = createAsyncThunk<
  void,
  IParticipant,
  { rejectValue: ValidationError }
>('participants/join', async (participant, { rejectWithValue }) => {
  try {
    await axiosApi.post('/participants', participant);
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      [400, 401, 403, 404].includes(error.response.status)
    ) {
      return rejectWithValue(error.response.data as ValidationError);
    }
    throw error;
  }
});

export const gambleParticipants = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('participants/gamble', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.post(`participants/${id}/gamble`);
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      [400, 401, 403, 404].includes(error.response.status)
    ) {
      return rejectWithValue(error.response.data as ValidationError);
    }
    throw error;
  }
});

export const removeParticipant = createAsyncThunk(
  'participants/leave',
  async ({ userId, partyId }: { userId: string; partyId: string }) => {
    await axiosApi.delete(`/participants`, {
      params: { user: userId, party: partyId },
    });
  },
);
