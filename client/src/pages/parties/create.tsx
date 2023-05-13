import Layout from '@/components/UI/Layout/Layout';
import { selectPartiesError } from '@/dispatchers/party/partiesSlice';
import { createParty } from '@/dispatchers/party/partiesThunk';
import PartyForm from '@/features/Party/components/PartyForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { GlobalError, IParty } from '@/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

const PartyCreate = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectPartiesError) as GlobalError;
  const router = useRouter();

  const onSubmit = async (party: IParty) => {
    try {
      const { meta } = await dispatch(createParty(party));

      if (meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Party created successfully', { variant: 'success' });
        router.push('/parties');
      } else if (meta.requestStatus === 'rejected') {
        const errorMessage = ['No token', 'Wrong token!'].includes(error.error)
          ? 'Please login to create a party'
          : error.error;
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }
    } catch (error) {}
  };

  return (
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
  );
};

export default PartyCreate;
