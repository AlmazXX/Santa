import { RootState } from '@/store/store';
import { ApiParticipant } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { getParticipants } from './participantsThunk';

interface ParticipantState {
  items: ApiParticipant[];
  loading: boolean;
  submitting: boolean;
}

const initialState: ParticipantState = {
  items: [],
  loading: false,
  submitting: false,
};

const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        // @ts-expect-error
        return action.payload.participants;
      })
      .addCase(getParticipants.pending, (state) => {
        state.loading = true;
      })
      .addCase(getParticipants.fulfilled, (state, { payload: result }) => {
        state.loading = false;
        state.items = result.participants;
      })
      .addCase(getParticipants.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const participantsReducer = participantsSlice.reducer;
export const selectParticipants = (state: RootState) =>
  state.participants.items;
export const selectParticipantsLoading = (state: RootState) =>
  state.participants.loading;
export const selectParticipantsSubmitting = (state: RootState) =>
  state.participants.submitting;
