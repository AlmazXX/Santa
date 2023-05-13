import { RootState } from '@/store/store';
import { ApiParty, GlobalError, ValidationError } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { createParty, getParties } from './partiesThunk';

interface InitialParties {
  items: ApiParty[];
  loading: boolean;
  submitting: boolean;
  error: ValidationError | GlobalError | null;
}

const initialState: InitialParties = {
  items: [],
  loading: false,
  submitting: false,
  error: null,
};

const partiesSlice = createSlice({
  name: 'parties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (_, action) => {
        // @ts-expect-error
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
        console.log(error);

        state.error = error || null;
      });
  },
});

export const partiesReducer = partiesSlice.reducer;
export const selectParties = (state: RootState) => state.parties.items;
export const selectPartiesLoading = (state: RootState) => state.parties.loading;
export const selectPartiesSubmitting = (state: RootState) =>
  state.parties.submitting;
export const selectPartiesError = (state: RootState) => state.parties.error;
