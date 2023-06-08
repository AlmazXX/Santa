import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/components/UI/Layout/Layout';
import { selectUser } from '@/dispatchers/user/usersSlice';
import { selectWishItem } from '@/dispatchers/wishlist/wishlistsSlice';
import { getWishItem } from '@/dispatchers/wishlist/wishlistsThunk';
import WishlistForm from '@/features/Wishlist/components/WishlistForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IWishlist } from '@/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const Edit = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const wishItem = useAppSelector(selectWishItem);
  const router = useRouter();
  const { wishItem: wishItemId } = router.query as { wishItem: string };

  React.useEffect(() => {
    if (wishItemId) {
      dispatch(getWishItem(wishItemId));
    }
  }, [wishItemId, dispatch]);

  React.useEffect(() => {
    if (!wishItem) {
      router.back();
    }
  }, [wishItem]);

  //   const existingWishItem:IWishlist = {
  //     party: wishItem.party,
  //     title: wishItem.title,
  //     address: wishItem.address,
  //     description: wishItem.description,
  //   };

  return (
    <ProtectedRoute isAllowed={Boolean(user)}>
      <Layout>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography>Edit item in your wishlist</Typography>
          </Grid>
          <Grid item>
            {/* <WishlistForm
              existingWishItem={existingWishItem}
              onSubmit={() => {}}
            /> */}
          </Grid>
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default Edit;
