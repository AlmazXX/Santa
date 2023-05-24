import axiosApi from '@/axiosApi';
import { ApiResponse, ApiWishlist, IPagination, SearchParam } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

type WishlistQuery = SearchParam<Pick<ApiWishlist, 'user' | 'party' | 'title'>>;

export const getWishlist = createAsyncThunk<
  IPagination<ApiWishlist>,
  WishlistQuery
>('wishlists/fetch', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<ApiWishlist>>('/wishlists', {
    params,
  });
  return data.result as IPagination<ApiWishlist>;
});
