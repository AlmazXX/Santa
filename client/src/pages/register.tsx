import FileInput from '@/components/UI/FileInput/FileInput';
import Layout from '@/components/UI/Layout/Layout';
import {
  cleanErrors,
  selectRegisterError,
  selectRegisterLoading,
} from '@/dispatchers/user/usersSlice';
import { googleLogin, register } from '@/dispatchers/user/usersThunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IRegister } from '@/types';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
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
  firstname: '',
  lastname: '',
  avatar: null,
};

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const registering = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const [state, setState] = React.useState<IRegister>(initialState);

  React.useEffect(() => {
    dispatch(cleanErrors());
  }, [router.pathname, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      setState(initialState);
      router.back();
    } catch (e) {
      console.error;
    }
  };

  const onGoogleLogin = async (credentials: string) => {
    await dispatch(googleLogin(credentials)).unwrap();
    router.back();
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ pt: 2 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                void onGoogleLogin(credentialResponse.credential as string);
              }}
              onError={() => console.log('Login failed')}
            />
          </Box>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  autoComplete="new-email"
                  value={state.email}
                  onChange={onChange}
                  error={Boolean(getFieldError('email'))}
                  helperText={getFieldError('email')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={onChange}
                  error={Boolean(getFieldError('password'))}
                  helperText={getFieldError('password')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="firstname"
                  label="First name"
                  autoComplete="new-firstname"
                  value={state.firstname}
                  onChange={onChange}
                  error={Boolean(getFieldError('firstname'))}
                  helperText={getFieldError('firstname')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastname"
                  label="Last name"
                  autoComplete="new-lastname"
                  value={state.lastname}
                  onChange={onChange}
                  error={Boolean(getFieldError('lastname'))}
                  helperText={getFieldError('lastname')}
                />
              </Grid>
              <Grid item xs={12}>
                <FileInput
                  name="avatar"
                  label="Avatar"
                  onChange={onFileChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={registering}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MaterialLink component={Link} href="/login" variant="body2">
                  Already have an account? Sign in
                </MaterialLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;
