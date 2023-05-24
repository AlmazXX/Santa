import Card from '@/components/UI/Card/Card';
import { apiURL } from '@/constants';
import {
  selectCurrentParticipant,
  selectParticipantJoining,
} from '@/dispatchers/participant/participantsSlice';
import { useAppSelector } from '@/store/hooks';
import { ApiParty } from '@/types';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import useJoin from '../hooks/useJoin';

interface Props {
  party: Pick<ApiParty, '_id' | 'title' | 'image'>;
}

const PartyItem: React.FC<Props> = ({ party }) => {
  const join = useJoin(party._id);
  const participant = useAppSelector(selectCurrentParticipant);
  const joining = useAppSelector(selectParticipantJoining);
  const partyImage = party.image && apiURL + '/' + party.image;
  const partyLink = `parties/${party._id}`;

  // Need to revise checking if user's in party since when many parties joined, join btn is invisible only in one party
  const isUserInParty = participant?.party._id === party._id;

  const onJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    join();
  };

  return (
    <Card image={partyImage} link={partyLink}>
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
