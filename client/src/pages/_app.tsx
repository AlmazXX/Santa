import { addInterceptors } from '@/axiosApi';
import { GOOGLE_CLIENT_ID } from '@/constants';
import { getMe } from '@/dispatchers/user/usersThunk';
import { wrapper } from '@/store/store';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  addInterceptors(store);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={4000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Component {...props.pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      const { token } = parseCookies(ctx);
      await store.dispatch(getMe(token));

      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      };
    },
);

export default App;
