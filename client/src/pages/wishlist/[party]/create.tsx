import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/components/UI/Layout/Layout';
import { selectUser } from '@/dispatchers/user/usersSlice';
import { addWishItem } from '@/dispatchers/wishlist/wishlistsThunk';
import WishlistForm from '@/features/Wishlist/components/WishlistForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IWishlist } from '@/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const WishlistCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const { party } = router.query as { party: string };

  React.useEffect(() => {
    if (!party) {
      router.back();
    }
  }, [party, router]);

  const onSubmit = async (wishItem: IWishlist) => {
    await dispatch(addWishItem(wishItem));
    void router.back();
  };

  return (
    <ProtectedRoute isAllowed={Boolean(user)}>
      <Layout>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography>Add item to wishlist</Typography>
          </Grid>
          <Grid item>
            <WishlistForm party={party} onSubmit={onSubmit} />
          </Grid>
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default WishlistCreate;
