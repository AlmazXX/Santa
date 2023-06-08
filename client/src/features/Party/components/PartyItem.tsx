import Card from '@/components/UI/Card/Card';
import {
  gambleParticipants,
  getParticipants,
  removeParticipant,
} from '@/dispatchers/participant/participantsThunk';
import {
  deleteParty,
  getParties,
  getSingleParty,
} from '@/dispatchers/party/partiesThunk';
import { selectUser } from '@/dispatchers/user/usersSlice';
import { getMe } from '@/dispatchers/user/usersThunk';
import useImageSrc from '@/hooks/useImageSrc';
import useIsCreator from '@/hooks/useIsCreator';
import useIsGambled from '@/hooks/useIsGambled';
import useUserInParty from '@/hooks/useIsInParty';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
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
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const onJoin = useJoin(party._id);
  const isUserInParty = useUserInParty(party._id);
  const isUserCreator = useIsCreator(party._id);
  const isPartyGambled = useIsGambled();
  const partyImage = useImageSrc(party.image);
  const router = useRouter();

  const onGamble = async () => {
    await dispatch(gambleParticipants(party._id));
    user && dispatch(getMe(user.token));
    dispatch(getSingleParty(party._id));
  };

  const onDelete = async () => {
    await dispatch(deleteParty(party._id));
    dispatch(getParties());
  };

  const onLeave = async () => {
    await dispatch(removeParticipant(party._id));
    dispatch(getParticipants({ party: party._id }));
  };

  const onEdit = async () => {
    router.push(`parties/edit/${party._id}`);
  };

  const creatorActions = [
    {
      action: onGamble,
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
