import { GOOGLE_CLIENT_ID } from '@/constants';
import { wrapper } from '@/store/store';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

const App: React.FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...props.pageProps} />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
