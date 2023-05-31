import TabPanel from '@/components/UI/TabPanel/TabPanel';
import { selectUser } from '@/dispatchers/user/usersSlice';
import {
  closeDrawer,
  openForm,
  selectWishBoard,
  selectWishlist,
  selectWishlistFormIsOpen,
  selectWishlistIsOpen,
  setWishBoard,
} from '@/dispatchers/wishlist/wishlistsSlice';
import { getWishlist } from '@/dispatchers/wishlist/wishlistsThunk';
import useCurrentVictim from '@/hooks/useCurrentVictim';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Button,
  Drawer,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import WishItem from './components/WishItem';
import WishlistForm from './components/WishlistForm';
import style from './WishlistBar.module.css';

const WishlistBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { party } = router.query as { party: string };
  const user = useAppSelector(selectUser);
  const wishlist = useAppSelector(selectWishlist);
  const isWishlistOpen = useAppSelector(selectWishlistIsOpen);
  const isFormOpen = useAppSelector(selectWishlistFormIsOpen);
  const wishBoard = useAppSelector(selectWishBoard);
  const victim = useCurrentVictim(party);

  React.useEffect(() => {
    if (user && wishBoard === 0) {
      dispatch(getWishlist({ party, user: user._id }));
    }
    if (wishBoard === 1 && victim) {
      dispatch(getWishlist({ party, user: victim }));
    }
  }, [user, victim, wishBoard, dispatch]);

  const onChange = (_event: React.SyntheticEvent, value: number) => {
    dispatch(setWishBoard(value));
  };

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
            <WishlistForm party={party} />
          </Grid>
        </Grid>
        <Grid item container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Tabs value={wishBoard} onChange={onChange}>
              <Tab label="Your wishlist" id="imple-tab-0" />
              <Tab label="Your victim's wishlist" id="imple-tab-2" />
            </Tabs>
          </Grid>
          <Grid item>
            <TabPanel value={wishBoard} index={0}>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
                {wishlist.map((wishItem) => (
                  <Grid item key={wishItem._id}>
                    <WishItem wishItem={wishItem} />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value={wishBoard} index={1}>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                spacing={2}
              >
                {victim ? (
                  wishlist.map((wishItem) => (
                    <Grid item key={wishItem._id}>
                      <WishItem wishItem={wishItem} />
                    </Grid>
                  ))
                ) : (
                  <Typography>You don't have victim yet</Typography>
                )}
              </Grid>
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default WishlistBar;
