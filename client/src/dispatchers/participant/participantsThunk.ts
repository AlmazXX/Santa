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
import { setCurrentParticipant } from './participantsSlice';

type ParticipantsQuery = SearchParam<
  Pick<ApiParticipant, 'user' | 'party' | 'victim'>
>;

export const getParticipants = createAsyncThunk<
  IPagination<ApiParticipant>,
  ParticipantsQuery,
  { state: RootState; dispatch: AppDispatch }
>('participants/get', async (params, { getState, dispatch }) => {
  const { data } = await axiosApi.get<ApiResponse<ApiParticipant>>(
    '/participants',
    { params },
  );
  const { result } = data as { result: IPagination<ApiParticipant> };
  const { user } = getState().users;

  if (user) {
    const participant = result.participants.find(
      (participant) => participant.user._id === user._id,
    );

    participant && dispatch(setCurrentParticipant(participant));
  }

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
