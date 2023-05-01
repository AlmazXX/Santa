import { GOOGLE_CLIENT_ID } from '@/constants';
import { store } from '@/store/store';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
