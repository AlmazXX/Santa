import { RootState } from '@/store/store';
import { ApiWishlist } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {
  addWishItem,
  deleteWishItem,
  getWishItem,
  getWishlist,
} from './wishlistsThunk';

interface InitialWishlist {
  isWishlistDrawerOpen: boolean;
  isWishlistFormOpen: boolean;
  isWishModalOpen: boolean;
  loading: boolean;
  submitting: boolean;
  deleting: string | false;
  items: ApiWishlist[];
  currentPage: number;
  totalCount: number;
  item: ApiWishlist | null;
}

const initialState: InitialWishlist = {
  isWishlistDrawerOpen: false,
  isWishlistFormOpen: false,
  isWishModalOpen: false,
  loading: false,
  submitting: false,
  deleting: false,
  items: [],
  currentPage: 1,
  totalCount: 0,
  item: null,
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
    setWishItem: (state, { payload }: PayloadAction<ApiWishlist | null>) => {
      state.item = payload;
    },
    openWishModal: (state) => {
      state.isWishModalOpen = true;
    },
    closeWishModal: (state) => {
      state.isWishModalOpen = false;
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
      })
      .addCase(addWishItem.pending, (state) => {
        state.submitting = true;
      })
      .addCase(addWishItem.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(addWishItem.rejected, (state) => {
        state.submitting = false;
      })
      .addCase(getWishItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishItem.fulfilled, (state, { payload: wishItem }) => {
        state.loading = false;
        state.item = wishItem;
      })
      .addCase(getWishItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteWishItem.pending, (state, { meta }) => {
        state.deleting = meta.arg;
      })
      .addCase(deleteWishItem.fulfilled, (state) => {
        state.deleting = false;
      })
      .addCase(deleteWishItem.rejected, (state) => {
        state.deleting = false;
      });
  },
});

export const wishlistsReducer = wishlistsSlice.reducer;
export const {
  openDrawer,
  closeDrawer,
  openForm,
  closeForm,
  setWishItem,
  openWishModal,
  closeWishModal,
} = wishlistsSlice.actions;
export const selectWishlistIsOpen = (state: RootState) =>
  state.wishlists.isWishlistDrawerOpen;
export const selectWishlistFormIsOpen = (state: RootState) =>
  state.wishlists.isWishlistFormOpen;
export const selectWishModalIsOpen = (state: RootState) =>
  state.wishlists.isWishModalOpen;
export const selectWishlist = (state: RootState) => state.wishlists.items;
export const selectWishItem = (state: RootState) => state.wishlists.item;
export const selectWishlistLoading = (state: RootState) =>
  state.wishlists.loading;
export const selectWishlistSubmitting = (state: RootState) =>
  state.wishlists.submitting;
export const selectWishlistDeleting = (state: RootState) =>
  state.wishlists.deleting;
