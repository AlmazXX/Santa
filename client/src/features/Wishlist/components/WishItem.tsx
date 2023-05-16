import Card from '@/components/UI/Card/Card';
import { apiURL } from '@/constants';
import { ApiWishlist } from '@/types';
import { Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
  wishItem: ApiWishlist;
}

const WishItem: React.FC<Props> = ({ wishItem }) => {
  const wishImage = wishItem.image && apiURL + '/' + wishItem.image;

  return (
    <Card image={wishImage}>
      <Grid container position="relative" zIndex={2} p={2}>
        <Grid item>
          <Typography variant="h6">{wishItem.title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{wishItem.address}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{wishItem.description}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WishItem;
