import { Store } from '@reduxjs/toolkit';
import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { apiURL } from './constants';
import { RootState } from './store/store';

const axiosApi = axios.create({ baseURL: apiURL });

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = store.getState().users.user?.token;
    const headers = <AxiosHeaders>config.headers;
    headers.set('Authorization', token);

    return config;
  });
};

export default axiosApi;
