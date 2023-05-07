import { selectParties } from '@/dispatchers/party/partiesSlice';
import { getParties } from '@/dispatchers/party/partiesThunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import PartyItem from './components/PartyItem';

const Parties = () => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(selectParties);

  React.useEffect(() => {
    dispatch(getParties());
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography>Parties</Typography>
      </Grid>
      <Grid item container>
        {parties.map((party) => (
          <Grid key={party._id}>
            <PartyItem party={party} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Parties;