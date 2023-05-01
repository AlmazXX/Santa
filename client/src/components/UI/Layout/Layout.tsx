import { Container, CssBaseline } from '@mui/material';
import Head from 'next/head';
import React, { PropsWithChildren } from 'react';
import AppToolbar from '../AppToolbar/AppToolbar';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Head>
        <meta
          name="description"
          content="Invite your friends to play Secret Santa"
        />
        <meta name="title" content="Secret Santa" />
      </Head>
      <AppToolbar />
      <main>
        <Container maxWidth="xl">{children}</Container>
      </main>
    </React.Fragment>
  );
};

export default Layout;
