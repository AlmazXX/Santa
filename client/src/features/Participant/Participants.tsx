import {
  selectCurrentParticipant,
  selectParticipants,
} from '@/dispatchers/participant/participantsSlice';
import { useAppSelector } from '@/store/hooks';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import ParticipantItem from './components/ParticipantItem';

const Participants: React.FC = () => {
  const participants = useAppSelector(selectParticipants);
  const currentParticipant = useAppSelector(selectCurrentParticipant);

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography>Participants</Typography>
      </Grid>
      <Grid item container direction="row" alignItems="center" spacing={2}>
        {participants.map((participant) => (
          <Grid item key={participant._id}>
            <ParticipantItem
              participant={participant}
              isVictim={currentParticipant?.victim === participant.user._id}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Participants;
