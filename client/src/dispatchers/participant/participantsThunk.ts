import axiosApi from '@/axiosApi';
import { AppDispatch, RootState, RootStore } from '@/store/store';
import { ApiParticipant, ApiResponse, IPagination } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setParticipant } from './participantsSlice';

interface SearchParam {
  user?: ApiParticipant['user']['_id'];
  party?: ApiParticipant['party']['_id'];
  victim?: ApiParticipant['victim'];
}

export const getParticipants = createAsyncThunk<
  IPagination<ApiParticipant>,
  SearchParam,
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
