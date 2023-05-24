import { RootState } from '@/store/store';
import { ApiParticipant } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { getParticipants } from './participantsThunk';

interface InitialParticipants {
  items: ApiParticipant[];
  loading: boolean;
  submitting: boolean;
  currentParticipant: ApiParticipant | null;
}

const initialState: InitialParticipants = {
  items: [],
  loading: false,
  submitting: false,
  currentParticipant: null,
};

const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    setCurrentParticipant: (
      state,
      { payload }: PayloadAction<ApiParticipant>,
    ) => {
      state.currentParticipant = payload;
    },
  },
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
      });
  },
});

export const participantsReducer = participantsSlice.reducer;
export const { setCurrentParticipant } = participantsSlice.actions;
export const selectParticipants = (state: RootState) =>
  state.participants.items;
export const selectParticipantsLoading = (state: RootState) =>
  state.participants.loading;
export const selectParticipantsSubmitting = (state: RootState) =>
  state.participants.submitting;
export const selectCurrentParticipant = (state: RootState) =>
  state.participants.currentParticipant;
