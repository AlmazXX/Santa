import Card from '@/components/UI/Card/Card';
import { apiURL } from '@/constants';
import { selectCurrentParticipant } from '@/dispatchers/participant/participantsSlice';
import { useAppSelector } from '@/store/hooks';
import { ApiParty } from '@/types';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
  party: Pick<ApiParty, '_id' | 'title' | 'image'>;
}

const PartyItem: React.FC<Props> = ({ party }) => {
  const participant = useAppSelector(selectCurrentParticipant);
  const partyImage = party.image && apiURL + '/' + party.image;
  const partyLink = `parties/${party._id}`;

  const isUserInParty = participant?.party._id === party._id;

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
            <Button style={{ marginLeft: '-8px' }}>Join now</Button>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default PartyItem;
