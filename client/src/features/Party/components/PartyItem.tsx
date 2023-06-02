import Card from '@/components/UI/Card/Card';
import {
  gambleParticipants,
  removeParticipant,
} from '@/dispatchers/participant/participantsThunk';
import { deleteParty, getParties } from '@/dispatchers/party/partiesThunk';
import { selectUser } from '@/dispatchers/user/usersSlice';
import useDispatchAction from '@/hooks/useDispatchAction';
import useImageSrc from '@/hooks/useImageSrc';
import useIsCreator from '@/hooks/useIsCreator';
import useIsGambled from '@/hooks/useIsGambled';
import useUserInParty from '@/hooks/useIsInParty';
import { useAppSelector } from '@/store/hooks';
import { ApiParty } from '@/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import useJoin from '../../../hooks/useJoin';

interface Props {
  party: Pick<ApiParty, '_id' | 'title' | 'creator' | 'image'>;
  isBanner?: boolean;
}

const PartyItem: React.FC<Props> = ({ party, isBanner }) => {
  const user = useAppSelector(selectUser);
  const onJoin = useJoin(party._id);
  const onGable = useDispatchAction(gambleParticipants(party._id));
  const isUserInParty = useUserInParty(party._id);
  const isUserCreator = useIsCreator(party._id);
  const isPartyGambled = useIsGambled(party._id);
  const partyImage = useImageSrc(party.image);
  const router = useRouter();
  const onDelete = useDispatchAction(deleteParty(party._id), getParties());
  const onLeave = useDispatchAction(
    removeParticipant({ userId: user ? user._id : '', partyId: party._id }),
  );

  const onEdit = async () => {
    router.push(`parties/edit/${party._id}`);
  };

  const creatorActions = [
    {
      action: onGable,
      title: 'Gamble',
      isHidden: isPartyGambled,
    },
    {
      action: onEdit,
      title: 'Edit',
    },
    {
      action: onDelete,
      title: 'Delete',
    },
  ];

  const userActions = [
    {
      action: onJoin,
      title: 'Join party',
      isHidden: isUserInParty || isPartyGambled,
    },
    {
      action: onLeave,
      title: 'Leave party',
      isHidden: !isUserInParty || isPartyGambled,
    },
  ];

  return (
    <Card
      image={partyImage}
      link={'parties/' + party._id}
      actions={isUserCreator ? creatorActions : userActions}
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
      </Grid>
    </Card>
  );
};

export default PartyItem;
