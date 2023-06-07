import { selectParticipants } from '@/dispatchers/participant/participantsSlice';
import { selectUser } from '@/dispatchers/user/usersSlice';
import { getWishlist } from '@/dispatchers/wishlist/wishlistsThunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Grid, MenuItem, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const WishlistPartyPicker: React.FC = () => {
  const router = useRouter();
  const { party } = router.query;
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const parties = useAppSelector(selectParticipants);

  if (!user) {
    return null;
  }

  const partyOptions = parties.map((party) => (
    <MenuItem key={party._id} value={party.party._id}>
      {party.party.title}
    </MenuItem>
  ));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(getWishlist({ user: user._id, party: value }));
    router.push(`/wishlist/${value}`);
  };

  return (
    <form>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Select one of your parties to see its wishlist"
            value={party ? party : ''}
            onChange={onChange}
          >
            <MenuItem value="">All wishlist items</MenuItem>
            {partyOptions}
          </TextField>
        </Grid>
      </Grid>
    </form>
  );
};

export default WishlistPartyPicker;
