import Layout from '@/components/UI/Layout/Layout';
import { getParticipants } from '@/dispatchers/participant/participantsThunk';
import { openDrawer } from '@/dispatchers/wishlist/wishlistsSlice';
import { getWishlist } from '@/dispatchers/wishlist/wishlistsThunk';
import Participants from '@/features/Participant/Participants';
import WishlistBar from '@/features/Wishlist/WishlistBar';
import { useAppDispatch } from '@/store/hooks';
import { wrapper } from '@/store/store';
import { Button, Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

const singleParty: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <Grid container>
        <Grid item>
          <Participants />
        </Grid>
      </Grid>
      <WishlistBar />
      <Button
        variant="contained"
        onClick={() => {
          dispatch(openDrawer());
        }}
        style={{
          position: 'fixed',
          left: '100%',
          top: '50%',
          transformOrigin: '0% 0%',
          transform: 'rotate(270deg) translate(-50%,-96%)',
        }}
      >
        Wishlist
      </Button>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    await store.dispatch(getParticipants(params ? params : {}));
    await store.dispatch(getWishlist(params ? params : {}));

    return { props: {} };
  });

export default singleParty;
