import {
  selectParticipants,
  selectParticipantsLoading,
} from '@/dispatchers/participant/participantsSlice';
import { useAppSelector } from '@/store/hooks';
import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import ParticipantItem from './components/ParticipantItem';

const Participants: React.FC = () => {
  const participants = useAppSelector(selectParticipants);
  const participantsLoading = useAppSelector(selectParticipantsLoading);

  const participantsList = participants.length ? (
    participants.map((participant) => (
      <Grid item key={participant._id}>
        <ParticipantItem participant={participant} />
      </Grid>
    ))
  ) : (
    <Grid item>
      <Typography>No participants yet</Typography>
    </Grid>
  );

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography>Participants</Typography>
      </Grid>
      <Grid item container direction="row" alignItems="stretch" spacing={2}>
        {participantsLoading ? <CircularProgress /> : participantsList}
      </Grid>
    </Grid>
  );
};

export default Participants;
