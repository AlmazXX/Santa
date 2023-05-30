import { RootState } from '@/store/store';
import { ApiParty, GlobalError, ValidationError } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {
  createParty,
  deleteParty,
  getParties,
  getSingleParty,
} from './partiesThunk';

interface InitialParties {
  items: ApiParty[];
  item: ApiParty | null;
  loading: boolean;
  submitting: boolean;
  deleting: string | false;
  error: ValidationError | GlobalError | null;
}

const initialState: InitialParties = {
  items: [],
  item: null,
  loading: false,
  submitting: false,
  deleting: false,
  error: null,
};

const partiesSlice = createSlice({
  name: 'parties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (_, action) => {
        // @ts-expect-error hydrate's action payload is not typed
        return action.payload.parties;
      })
      .addCase(getParties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getParties.fulfilled, (state, { payload: result }) => {
        state.loading = false;
        state.items = result.parties;
      })
      .addCase(getParties.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createParty.pending, (state) => {
        state.error = null;
        state.submitting = true;
      })
      .addCase(createParty.fulfilled, (state) => {
        state.error = null;
        state.submitting = false;
      })
      .addCase(createParty.rejected, (state, { payload: error }) => {
        state.submitting = false;
        state.error = error || null;
      })
      .addCase(getSingleParty.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleParty.fulfilled, (state, { payload: party }) => {
        state.loading = false;
        state.item = party;
      })
      .addCase(getSingleParty.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteParty.pending, (state, { meta }) => {
        state.deleting = meta.arg;
      })
      .addCase(deleteParty.fulfilled, (state) => {
        state.deleting = false;
      })
      .addCase(deleteParty.rejected, (state) => {
        state.deleting = false;
      });
  },
});

export const partiesReducer = partiesSlice.reducer;
export const selectParties = (state: RootState) => state.parties.items;
export const selectSingleParty = (state: RootState) => state.parties.item;
export const selectPartiesLoading = (state: RootState) => state.parties.loading;
export const selectPartiesSubmitting = (state: RootState) =>
  state.parties.submitting;
export const selectPartiesDeleting = (state: RootState) =>
  state.parties.deleting;
export const selectPartiesError = (state: RootState) => state.parties.error;
