import Card from '@/components/UI/Card/Card';
import { selectParticipantJoining } from '@/dispatchers/participant/participantsSlice';
import { gambleParticipants } from '@/dispatchers/participant/participantsThunk';
import { deleteParty, getParties } from '@/dispatchers/party/partiesThunk';
import useDispatchAction from '@/hooks/useDispatchAction';
import useImageSrc from '@/hooks/useImageSrc';
import useIsCreator from '@/hooks/useIsCreator';
import useIsGambled from '@/hooks/useIsGambled';
import useUserInParty from '@/hooks/useIsInParty';
import { useAppSelector } from '@/store/hooks';
import { ApiParty } from '@/types';
import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import useJoin from '../../../hooks/useJoin';

interface Props {
  party: Pick<ApiParty, '_id' | 'title' | 'creator' | 'image'>;
  isBanner?: boolean;
}

const PartyItem: React.FC<Props> = ({ party, isBanner }) => {
  const joining = useAppSelector(selectParticipantJoining);
  const join = useJoin(party._id);
  const gample = useDispatchAction(gambleParticipants(party._id));
  const isUserInParty = useUserInParty(party._id);
  const isUserCreator = useIsCreator(party._id);
  const isPartyGambled = useIsGambled(party._id);
  const partyImage = useImageSrc(party.image);
  const router = useRouter();
  const onDelete = useDispatchAction(deleteParty(party._id), getParties());

  const onEdit = async (id: string) => {
    router.push(`parties/edit/${id}`);
  };

  const cardActions = [
    {
      action: gample,
      title: 'Gamble',
      isHidden: isPartyGambled || !isUserInParty,
    },
    {
      action: () => onEdit(party._id),
      title: 'Edit',
      isHidden: !isUserCreator,
    },
    {
      action: onDelete,
      title: 'Delete',
      isHidden: !isUserCreator,
    },
  ];

  return (
    <Card
      image={partyImage}
      link={'parties/' + party._id}
      actions={cardActions}
      width={isBanner ? '100%' : ''}
    >
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
        {isUserInParty || isPartyGambled ? null : (
          <Grid item>
            <Button
              onClick={join}
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
