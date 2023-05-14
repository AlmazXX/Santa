import {
  closeDrawer,
  openForm,
  selectWishlistFormIsOpen,
  selectWishlistIsOpen,
} from '@/dispatchers/wishlist/wishlistsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Drawer, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import WishlistForm from './components/WishlistForm';
import style from './WishlistBar.module.css';

const WishlistBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isWishlistOpen = useAppSelector(selectWishlistIsOpen);
  const isFormOpen = useAppSelector(selectWishlistFormIsOpen);

  return (
    <Drawer
      anchor="right"
      open={isWishlistOpen}
      onClose={() => dispatch(closeDrawer())}
    >
      <Grid
        container
        direction="column"
        spacing={2}
        p={2}
        className={style.wishlistBar}
      >
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-between"
          wrap="nowrap"
          spacing={2}
        >
          <Grid item container spacing={2}>
            <Grid item>
              <FavoriteBorderIcon />
            </Grid>
            <Grid item>
              <Typography variant="h5">Wishlist</Typography>
            </Grid>
          </Grid>

          <Grid item>
            <IconButton onClick={() => dispatch(closeDrawer())}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item container direction="column" spacing={2}>
          <Grid item display={isFormOpen ? 'none' : 'block'} xs>
            <Button
              color="success"
              variant="contained"
              onClick={() => dispatch(openForm())}
              style={{ width: '100%' }}
            >
              Add wishlist
            </Button>
          </Grid>
          <Grid item display={isFormOpen ? 'block' : 'none'}>
            <WishlistForm />
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default WishlistBar;
