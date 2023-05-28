import { RootState } from '@/store/store';
import { ApiParticipant } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { getParticipants, joinParty } from './participantsThunk';

interface InitialParticipants {
  items: ApiParticipant[];
  loading: boolean;
  joining: boolean;
}

const initialState: InitialParticipants = {
  items: [],
  loading: false,
  joining: false,
};

const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (_, action) => {
        // @ts-expect-error hydrate's action payload is not typed
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
      })
      .addCase(joinParty.pending, (state) => {
        state.joining = true;
      })
      .addCase(joinParty.fulfilled, (state) => {
        state.joining = false;
      })
      .addCase(joinParty.rejected, (state) => {
        state.joining = false;
      });
  },
});

export const participantsReducer = participantsSlice.reducer;
export const selectParticipants = (state: RootState) =>
  state.participants.items;
export const selectParticipantsLoading = (state: RootState) =>
  state.participants.loading;
export const selectParticipantJoining = (state: RootState) =>
  state.participants.joining;
