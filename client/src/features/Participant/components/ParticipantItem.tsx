import Card from '@/components/UI/Card/Card';
import { apiURL } from '@/constants';
import { ApiParticipant } from '@/types';
import { Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
  participant: Pick<ApiParticipant, 'user' | 'party' | 'victim'>;
  isVictim: boolean;
}

const ParticipantItem: React.FC<Props> = ({ participant, isVictim }) => {
  const participantAvatar =
    participant.user.avatar && apiURL + '/' + participant.user.avatar;

  const victim = isVictim && (
    <Grid item>
      <Typography>Your victime</Typography>
    </Grid>
  );

  return (
    <Card image={participantAvatar}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        zIndex={1}
        position="relative"
        width="100%"
        height="100%"
        p={2}
      >
        <Grid item>
          <Typography variant="h5">{participant.user.firstname}</Typography>
        </Grid>
        {victim}
      </Grid>
    </Card>
  );
};

export default ParticipantItem;
