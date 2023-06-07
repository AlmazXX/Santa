import Card from '@/components/UI/Card/Card';
import {
  openWishModal,
  setWishItem,
} from '@/dispatchers/wishlist/wishlistsSlice';
import {
  deleteWishItem,
  getWishlist,
} from '@/dispatchers/wishlist/wishlistsThunk';
import useImageSrc from '@/hooks/useImageSrc';
import { useAppDispatch } from '@/store/hooks';
import { ApiWishlist } from '@/types';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
  wishItem: ApiWishlist;
}

const WishItem: React.FC<Props> = ({ wishItem }) => {
  const dispatch = useAppDispatch();
  const wishImage = useImageSrc(wishItem.image);

  const openModal = () => {
    dispatch(setWishItem(wishItem));
    dispatch(openWishModal());
  };

  const deleteItem = async () => {
    await dispatch(deleteWishItem(wishItem._id));
    dispatch(getWishlist({ party: wishItem.party, user: wishItem._id }));
  };

  const userActions = [{ action: deleteItem, title: 'Delete' }];

  return (
    <Card image={wishImage} actions={userActions}>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        position="relative"
        zIndex={2}
        p={2}
      >
        <Grid item>
          <Typography variant="h6">{wishItem.title}</Typography>
        </Grid>
        <Button onClick={openModal} style={{ marginLeft: '-8px' }}>
          See full
        </Button>
      </Grid>
    </Card>
  );
};

export default WishItem;
