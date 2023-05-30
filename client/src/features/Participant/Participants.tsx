import AddButton from '@/components/UI/AddButton/AddButton';
import { selectParticipants } from '@/dispatchers/participant/participantsSlice';
import {
  gambleParticipants,
  getParticipants,
} from '@/dispatchers/participant/participantsThunk';
import { selectSingleParty } from '@/dispatchers/party/partiesSlice';
import { getSingleParty } from '@/dispatchers/party/partiesThunk';
import { selectUser } from '@/dispatchers/user/usersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ApiParty } from '@/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import useJoin from '../Party/hooks/useJoin';
import ParticipantItem from './components/ParticipantItem';

const Participants: React.FC = () => {
  const router = useRouter();
  const { party: partyId } = router.query as { party: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const party = useAppSelector(selectSingleParty);
  const participants = useAppSelector(selectParticipants);

  const join = useJoin(partyId);
  const gample = async () => {
    await dispatch(gambleParticipants(partyId));
    dispatch(getSingleParty(partyId));
    dispatch(getParticipants({ party: partyId }));
  };

  const gampleBtnCondition = party?.gambled
    ? false
    : party?.creator === user?._id;
  const joinBtnCondition = participants.some(
    (participant) => participant.user._id === user?._id,
  );

  const participant = participants.find(
    (participant) => participant.user._id === user?._id,
  );

  const gambleButton = gampleBtnCondition ? (
    <Grid item>
      <AddButton onClick={gample} />
    </Grid>
  ) : null;

  const joinButton = joinBtnCondition ? null : (
    <Grid item>
      <AddButton onClick={join} />
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
        {participants.map((p) => (
          <Grid item key={p._id}>
            <ParticipantItem
              participant={p}
              isVictim={p.user._id === participant?.victim}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Participants;
