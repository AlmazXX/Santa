import Card from '@/components/UI/Card/Card';
import useImageSrc from '@/hooks/useImageSrc';
import useIsVictim from '@/hooks/useIsVictim';
import { ApiParticipant } from '@/types';
import { Grid, Typography } from '@mui/material';
import React from 'react';

interface Props {
  participant: Pick<ApiParticipant, 'user' | 'party' | 'victim'>;
}

const ParticipantItem: React.FC<Props> = ({ participant }) => {
  const isVictim = useIsVictim(participant);
  const participantAvatar = useImageSrc(participant.user.avatar);

  const victim = isVictim ? (
    <Grid item>
      <Typography>Your victim</Typography>
    </Grid>
  ) : null;

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
