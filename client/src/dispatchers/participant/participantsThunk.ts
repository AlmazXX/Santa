import axiosApi from '@/axiosApi';
import { AppDispatch, RootState } from '@/store/store';
import { ApiParticipant, ApiResponse, IPagination, SearchParam } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setParticipant } from './participantsSlice';

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
  const user = getState().users.user;

  if (user) {
    const participant = result.participants.find(
      (participant) => participant.user._id === user._id,
    );

    participant && dispatch(setParticipant(participant));
  }

  return result;
});
