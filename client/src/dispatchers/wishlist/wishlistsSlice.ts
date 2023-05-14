import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';

interface InitialWishlist {
  isDrawerOpen: boolean;
  isFormOpen: boolean;
}

const initialState: InitialWishlist = {
  isDrawerOpen: true,
  isFormOpen: false,
};

const wishlistsSlice = createSlice({
  name: 'wishlists',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    openForm: (state) => {
      state.isFormOpen = true;
    },
    closeForm: (state) => {
      state.isFormOpen = false;
    },
  },
});

export const wishlistsReducer = wishlistsSlice.reducer;
export const { openDrawer, closeDrawer, openForm, closeForm } =
  wishlistsSlice.actions;
export const selectWishlistIsOpen = (state: RootState) =>
  state.wishlists.isDrawerOpen;
export const selectWishlistFormIsOpen = (state: RootState) =>
  state.wishlists.isFormOpen;
