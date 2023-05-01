import React from 'react';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
              Santa
            </Link>
          </Typography>
          <Grid item></Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
