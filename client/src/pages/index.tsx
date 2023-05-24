import Layout from '@/components/UI/Layout/Layout';
import { getParticipants } from '@/dispatchers/participant/participantsThunk';
import { getParties } from '@/dispatchers/party/partiesThunk';
import Parties from '@/features/Party/Parties';
import { wrapper } from '@/store/store';
import { Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

const index: React.FC = () => {
  return (
    <Layout>
      <Grid container>
        <Grid item>
          <Parties />
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    const { user } = store.getState().users;
    await store.dispatch(getParties());
    user && (await store.dispatch(getParticipants({ user: user._id })));

    return { props: {} };
  });

export default index;
