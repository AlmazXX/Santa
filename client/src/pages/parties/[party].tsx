import Layout from '@/components/UI/Layout/Layout';
import { getParticipants } from '@/dispatchers/participant/participantsThunk';
import { selectSingleParty } from '@/dispatchers/party/partiesSlice';
import { getSingleParty } from '@/dispatchers/party/partiesThunk';
import { selectUser } from '@/dispatchers/user/usersSlice';
import { openDrawer } from '@/dispatchers/wishlist/wishlistsSlice';
import { getWishlist } from '@/dispatchers/wishlist/wishlistsThunk';
import Participants from '@/features/Participant/Participants';
import PartyItem from '@/features/Party/components/PartyItem';
import WishlistBar from '@/features/Wishlist/WishlistBar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { wrapper } from '@/store/store';
import { User } from '@/types';
import { Button, Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

const SingleParty: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const party = useAppSelector(selectSingleParty);

  const openWishlist = () => {
    dispatch(openDrawer());
  };

  return (
    <Layout>
      <Grid container direction="column" alignItems="baseline" spacing={1}>
        {party && (
          <Grid item style={{ width: '100%' }}>
            <PartyItem party={party} isBanner={true} />
          </Grid>
        )}
        <Grid item>
          <Participants />
        </Grid>
      </Grid>
      {user && (
        <>
          <WishlistBar />
          <Button
            variant="contained"
            onClick={openWishlist}
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
        </>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const { user } = store.getState().users as { user: User };
    const { party } = params as { party: string };

    await store.dispatch(getSingleParty(party));
    await store.dispatch(getParticipants({ party }));
    user && (await store.dispatch(getWishlist({ party, user: user._id })));

    return { props: {} };
  });

export default SingleParty;
