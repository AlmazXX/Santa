import { selectParties } from '@/dispatchers/party/partiesSlice';
import { useAppSelector } from '@/store/hooks';
import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import PartyItem from './components/PartyItem';

const Parties: React.FC = () => {
  const router = useRouter();
  const parties = useAppSelector(selectParties);

  const onCreate = () => {
    router.push('/parties/create');
  };

  return (
    <Grid container spacing={1}>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography>Parties</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" onClick={onCreate}>
            Create party
          </Button>
        </Grid>
      </Grid>
      <Grid item container direction="row" alignItems="stretch" spacing={2}>
        {parties.map((party) => (
          <Grid key={party._id} item>
            <PartyItem party={party} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Parties;
