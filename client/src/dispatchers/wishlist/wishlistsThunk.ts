import axiosApi from '@/axiosApi';
import {
  ApiResponse,
  ApiWishlist,
  GlobalError,
  IPagination,
  IWishlist,
  SearchParam,
  ValidationError,
} from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

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

export const addWishItem = createAsyncThunk<
  void,
  IWishlist,
  { rejectValue: ValidationError | GlobalError }
>('wishists/add', async (wishItem, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = <(keyof IWishlist)[]>Object.keys(wishItem);

    keys.forEach((key) => {
      const value = wishItem[key];
      if (value) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/wishlists', formData);
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      [400, 401, 403, 404].includes(error.response.status)
    ) {
      return rejectWithValue(
        error.response.data as ValidationError | GlobalError,
      );
    }
    throw error;
  }
});
