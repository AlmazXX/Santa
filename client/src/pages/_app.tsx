import { store } from '@/store/store';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
