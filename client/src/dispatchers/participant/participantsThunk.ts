import axiosApi from '@/axiosApi';
import { ApiParticipant, ApiResponse, IPagination } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface SearchParam {
  user?: ApiParticipant['user']['_id'];
  party?: ApiParticipant['party']['_id'];
  victim?: ApiParticipant['victim'];
}

export const getParticipants = createAsyncThunk<
  IPagination<ApiParticipant>,
  SearchParam
>('participants/get', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<ApiParticipant>>(
    '/participants',
    { params },
  );
  return data.result as IPagination<ApiParticipant>;
});
