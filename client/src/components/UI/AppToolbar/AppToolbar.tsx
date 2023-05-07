import { selectLogout, selectUser } from '@/dispatchers/user/usersSlice';
import { useAppSelector } from '@/store/hooks';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import AnonMenu from './AnonMenu';
import UserMenu from './UserMenu';
import React from 'react';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const logout = useAppSelector(selectLogout);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
              Santa
            </Link>
          </Typography>
          <Grid item>
            {user ? <UserMenu user={user} loggingOut={logout} /> : <AnonMenu />}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
