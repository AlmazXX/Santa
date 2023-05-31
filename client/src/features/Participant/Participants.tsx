import CardButton from '@/components/UI/CardButton/CardButton';
import { selectParticipants } from '@/dispatchers/participant/participantsSlice';
import useGamble from '@/hooks/useGamble';
import useIsCreator from '@/hooks/useIsCreator';
import useUserInParty from '@/hooks/useIsInParty';
import { useAppSelector } from '@/store/hooks';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import useJoin from '../../hooks/useJoin';
import ParticipantItem from './components/ParticipantItem';

const Participants: React.FC = () => {
  const router = useRouter();
  const { party } = router.query as { party: string };
  const participants = useAppSelector(selectParticipants);
  const isUserInParty = useUserInParty(party);
  const isUserCreator = useIsCreator(party);
  const join = useJoin(party);
  const gample = useGamble(party);

  const gambleButton = isUserCreator ? (
    <Grid item>
      <CardButton onClick={gample}>Gamble</CardButton>
    </Grid>
  ) : null;

  const joinButton = isUserInParty ? null : (
    <Grid item>
      <CardButton onClick={join}>Join</CardButton>
    </Grid>
  );

  return (
    <Grid container spacing={1}>
      <Grid item>
        <Typography>Participants</Typography>
      </Grid>
      <Grid item container direction="row" alignItems="stretch" spacing={2}>
        {gambleButton}
        {joinButton}
        {participants.map((participant) => (
          <Grid item key={participant._id}>
            <ParticipantItem participant={participant} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Participants;
