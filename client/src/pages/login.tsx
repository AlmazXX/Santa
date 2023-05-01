import Layout from '@/components/UI/Layout/Layout';
import {
  cleanErrors,
  selectLoginError,
  selectLoginLoading,
} from '@/dispatchers/user/usersSlice';
import { googleLogin, login } from '@/dispatchers/user/usersThunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ILogin } from '@/types';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link as MaterialLink,
  TextField,
  Typography,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loggingIn = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);
  const [state, setState] = React.useState<ILogin>(initialState);

  React.useEffect(() => {
    dispatch(cleanErrors());
  }, [router.pathname, dispatch]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login(state)).unwrap();
      setState(initialState);
      router.push('/');
    } catch (e) {
      console.error();
    }
  };

  const onGoogleLogin = async (credentials: string) => {
    await dispatch(googleLogin(credentials)).unwrap();
    router.push('/');
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <Box
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ pt: 2 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                void onGoogleLogin(credentialResponse.credential as string);
              }}
              onError={() => console.log('Login failed')}
            />
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
              {error.error}
            </Alert>
          )}
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  autoComplete="current-email"
                  value={state.email}
                  onChange={onChange}
                  // required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={state.password}
                  onChange={onChange}
                  // required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loggingIn}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MaterialLink component={Link} href="/register" variant="body2">
                  Or sign up
                </MaterialLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;
