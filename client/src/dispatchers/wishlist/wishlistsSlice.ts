import { RootState } from '@/store/store';
import { ApiWishlist } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { getWishlist } from './wishlistsThunk';

interface InitialWishlist {
  isWishlistDrawerOpen: boolean;
  isWishlistFormOpen: boolean;
  loading: boolean;
  items: ApiWishlist[];
  currentPage: number;
  totalCount: number;
  wishBoard: number;
}

const initialState: InitialWishlist = {
  isWishlistDrawerOpen: false,
  isWishlistFormOpen: false,
  loading: false,
  items: [],
  currentPage: 1,
  totalCount: 0,
  wishBoard: 0,
};

const wishlistsSlice = createSlice({
  name: 'wishlists',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isWishlistDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isWishlistDrawerOpen = false;
    },
    openForm: (state) => {
      state.isWishlistFormOpen = true;
    },
    closeForm: (state) => {
      state.isWishlistFormOpen = false;
    },
    setWishBoard: (state, { payload }: PayloadAction<number>) => {
      state.wishBoard = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(HYDRATE, (_, action) => {
        // @ts-expect-error hydrate's action payload is not typed
        return action.payload.wishlists;
      })
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, { payload: result }) => {
        state.loading = false;
        state.items = result.wishlist;
        state.currentPage = result.currentPage;
        state.totalCount = result.totalCount;
      })
      .addCase(getWishlist.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const wishlistsReducer = wishlistsSlice.reducer;
export const { openDrawer, closeDrawer, openForm, closeForm, setWishBoard } =
  wishlistsSlice.actions;
export const selectWishlistIsOpen = (state: RootState) =>
  state.wishlists.isWishlistDrawerOpen;
export const selectWishlistFormIsOpen = (state: RootState) =>
  state.wishlists.isWishlistFormOpen;
export const selectWishBoard = (state: RootState) => state.wishlists.wishBoard;
export const selectWishlist = (state: RootState) => state.wishlists.items;
export const selectWishlistLoading = (state: RootState) =>
  state.wishlists.loading;
