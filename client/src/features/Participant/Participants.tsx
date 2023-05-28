import AddButton from '@/components/UI/AddButton/AddButton';
import { selectParticipants } from '@/dispatchers/participant/participantsSlice';
import { useAppSelector } from '@/store/hooks';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import useJoin from '../Party/hooks/useJoin';
import ParticipantItem from './components/ParticipantItem';

const Participants: React.FC = () => {
  const router = useRouter();
  const { party } = router.query as { party: string };
  const participants = useAppSelector(selectParticipants);
  const join = useJoin(party);

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography>Participants</Typography>
      </Grid>
      <Grid item container direction="row" alignItems="stretch" spacing={2}>
        <Grid item>
          <AddButton onClick={join} />
        </Grid>
        {participants.map((participant) => (
          <Grid item key={participant._id}>
            <ParticipantItem participant={participant} isVictim={false} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Participants;
