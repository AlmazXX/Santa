import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/components/UI/Layout/Layout';
import { getParticipants } from '@/dispatchers/participant/participantsThunk';
import { selectUser } from '@/dispatchers/user/usersSlice';
import { getWishlist } from '@/dispatchers/wishlist/wishlistsThunk';
import WishlistPartyPicker from '@/features/Wishlist/components/WishlistPartyPicker';
import WishModal from '@/features/Wishlist/components/WishModal';
import Wishlist from '@/features/Wishlist/Wishlist';
import { useAppSelector } from '@/store/hooks';
import { wrapper } from '@/store/store';
import { Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

const Index: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <ProtectedRoute isAllowed={Boolean(user)}>
      <Layout>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography>Wishlist</Typography>
          </Grid>
          <Grid item>
            <WishlistPartyPicker />
          </Grid>
          <Grid item>
            <Wishlist />
          </Grid>
        </Grid>
      </Layout>
      <WishModal />
    </ProtectedRoute>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    const { user } = store.getState().users;

    if (user) {
      await store.dispatch(getWishlist({ user: user._id }));
      await store.dispatch(getParticipants({ user: user._id }));
    }

    return { props: {} };
  });

export default Index;
