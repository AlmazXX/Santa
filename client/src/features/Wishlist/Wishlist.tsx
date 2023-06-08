import TabPanel from '@/components/UI/TabPanel/TabPanel';
import { selectUser } from '@/dispatchers/user/usersSlice';
import {
  selectWishlist,
  selectWishlistLoading,
} from '@/dispatchers/wishlist/wishlistsSlice';
import { getWishlist } from '@/dispatchers/wishlist/wishlistsThunk';
import useCurrentVictim from '@/hooks/useCurrentVictim';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CircularProgress, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import WishItem from './components/WishItem';

const Wishlist: React.FC = () => {
  const router = useRouter();
  const { party } = router.query as { party: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const wishlist = useAppSelector(selectWishlist);
  const wishlistLoading = useAppSelector(selectWishlistLoading);
  const victim = useCurrentVictim(party ? party : '');
  const [wishBoard, setWishBoard] = React.useState(0);

  React.useEffect(() => {
    if (user && wishBoard === 0) {
      dispatch(getWishlist({ party, user: user._id }));
    }

    if (victim && wishBoard === 1) {
      dispatch(getWishlist({ party, user: victim }));
    }
  }, [user, victim, party, wishBoard, dispatch]);

  const userWishlist = wishlist.length ? (
    wishlist.map((wishItem) => (
      <Grid item key={wishItem._id}>
        <WishItem wishItem={wishItem} />
      </Grid>
    ))
  ) : (
    <Grid item>
      <Typography>You do not have items in your wishlist yet</Typography>
    </Grid>
  );

  const victimWishlist = !victim ? (
    <Grid item>
      <Typography>You do not have victim yet</Typography>
    </Grid>
  ) : wishlist.length ? (
    wishlist.map((wishItem) => (
      <Grid item key={wishItem._id}>
        <WishItem wishItem={wishItem} />
      </Grid>
    ))
  ) : (
    <Grid item>
      <Typography>Victim doesn't have items in wishlist yet</Typography>
    </Grid>
  );

  return (
    <>
      <Tabs
        value={wishBoard}
        onChange={(_, index) => {
          setWishBoard(index);
        }}
      >
        <Tab label="Your wishlist" id="imple-tab-0" />
        <Tab label="Your victim's wishlist" id="imple-tab-2" />
      </Tabs>
      <TabPanel value={wishBoard} index={0}>
        <Grid container alignItems="stretch" spacing={2}>
          {wishlistLoading ? <CircularProgress /> : userWishlist}
        </Grid>
      </TabPanel>
      <TabPanel value={wishBoard} index={1}>
        <Grid item container alignItems="stretch" spacing={2}>
          {wishlistLoading ? <CircularProgress /> : victimWishlist}
        </Grid>
      </TabPanel>
    </>
  );
};

export default Wishlist;
