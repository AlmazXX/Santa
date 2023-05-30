import Card from '@/components/UI/Card/Card';
import { apiURL } from '@/constants';
import {
  selectParticipantJoining,
  selectParticipants,
} from '@/dispatchers/participant/participantsSlice';
import { deleteParty, getParties } from '@/dispatchers/party/partiesThunk';
import { selectUser } from '@/dispatchers/user/usersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ApiParty } from '@/types';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import useJoin from '../hooks/useJoin';

interface Props {
  party: Pick<ApiParty, '_id' | 'title' | 'creator' | 'image'>;
}

const PartyItem: React.FC<Props> = ({ party }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userParties = useAppSelector(selectParticipants);
  const joining = useAppSelector(selectParticipantJoining);
  const join = useJoin(party._id);
  const partyImage = party.image && apiURL + '/' + party.image;
  const partyLink = `parties/${party._id}`;

  const isUserInParty = userParties
    .map((party) => party.party._id)
    .includes(party._id);

  const onJoin = () => {
    join();
  };

  const onDelete = async () => {
    await dispatch(deleteParty(party._id));
    dispatch(getParties());
  };

  const cardActions =
    user?._id === party.creator
      ? [{ action: onDelete, title: 'Delete' }]
      : undefined;

  return (
    <Card image={partyImage} link={partyLink} actions={cardActions}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        zIndex={1}
        position="relative"
        p={2}
      >
        <Grid item>
          <Typography variant="h5">{party.title}</Typography>
        </Grid>
        {isUserInParty ? null : (
          <Grid item>
            <Button
              onClick={onJoin}
              disabled={joining}
              style={{ marginLeft: '-8px' }}
            >
              Join now
            </Button>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default PartyItem;
