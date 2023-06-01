import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/components/UI/Layout/Layout';
import { selectPartiesError } from '@/dispatchers/party/partiesSlice';
import { createParty } from '@/dispatchers/party/partiesThunk';
import { selectUser } from '@/dispatchers/user/usersSlice';
import PartyForm from '@/features/Party/components/PartyForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { GlobalError, IParty } from '@/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

const PartyCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectPartiesError) as GlobalError;
  const router = useRouter();

  const onSubmit = async (party: IParty) => {
    try {
      const { meta } = await dispatch(createParty(party));

      if (meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Party created successfully', { variant: 'success' });
        router.back();
      } else if (meta.requestStatus === 'rejected') {
        const errorMessage = ['No token', 'Wrong token!'].includes(error.error)
          ? 'Please login to create a party'
          : error.error;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProtectedRoute isAllowed={Boolean(user)}>
      <Layout>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography>Create party</Typography>
          </Grid>
          <Grid item>
            <PartyForm onSubmit={onSubmit} />
          </Grid>
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default PartyCreate;
