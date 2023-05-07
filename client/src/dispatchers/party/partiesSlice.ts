import { RootState } from '@/store/store';
import { ApiParty } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { getParties } from './partiesThunk';

interface InitialParties {
  loading: boolean;
  items: ApiParty[];
}

const initialState: InitialParties = {
  loading: false,
  items: [],
};

const partiesSlice = createSlice({
  name: 'parties',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getParties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getParties.fulfilled, (state, { payload: parties }) => {
        state.loading = false;
        state.items = parties.parties;
      })
      .addCase(getParties.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const partiesReducer = partiesSlice.reducer;
export const selectParties = (state: RootState) => state.parties.items;
export const selectPartiesLoading = (state: RootState) => state.parties.loading;
