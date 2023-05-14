import Layout from '@/components/UI/Layout/Layout';
import { getParticipants } from '@/dispatchers/participant/participantsThunk';
import Participants from '@/features/Participant/Participants';
import WishlistBar from '@/features/Wishlist/WishlistBar';
import { wrapper } from '@/store/store';
import { Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

const singleParty: React.FC = () => {
  return (
    <Layout>
      <Grid container>
        <Grid item>
          <Participants />
        </Grid>
      </Grid>
      <WishlistBar />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    await store.dispatch(getParticipants(params ? params : {}));

    return { props: {} };
  });

export default singleParty;
