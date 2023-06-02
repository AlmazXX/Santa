import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/components/UI/Layout/Layout';
import {
  selectPartiesError,
  selectSingleParty,
} from '@/dispatchers/party/partiesSlice';
import { editParty, getSingleParty } from '@/dispatchers/party/partiesThunk';
import PartyForm from '@/features/Party/components/PartyForm';
import useIsCreator from '@/hooks/useIsCreator';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { wrapper } from '@/store/store';
import { GlobalError, IParty } from '@/types';
import { Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

const Edit: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { party: partyId } = router.query as { party: string };
  const party = useAppSelector(selectSingleParty);
  const error = useAppSelector(selectPartiesError) as GlobalError;
  const userIsCreator = useIsCreator(partyId);

  const existingParty = party
    ? ({ title: party.title, image: party.image } as IParty)
    : undefined;

  const onSubmit = async (updatedParty: IParty) => {
    try {
      const { meta } = await dispatch(
        editParty({ id: partyId, party: updatedParty }),
      );

      if (meta.requestStatus === 'fulfilled') {
        enqueueSnackbar('Party edited successfully', { variant: 'success' });
        router.back();
      } else if (meta.requestStatus === 'rejected') {
        enqueueSnackbar(error.error, { variant: 'error' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProtectedRoute isAllowed={Boolean(userIsCreator)}>
      <Layout>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography>Edit party</Typography>
          </Grid>
          <Grid item>
            <PartyForm onSubmit={onSubmit} existingParty={existingParty} />
          </Grid>
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const { party } = params as { party: string };
    await store.dispatch(getSingleParty(party));

    return { props: {} };
  });

export default Edit;
