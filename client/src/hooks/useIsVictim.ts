import { selectUser } from '@/dispatchers/user/usersSlice';
import { useAppSelector } from '@/store/hooks';
import { ApiParticipant } from '@/types';
import React from 'react';

const useIsVictim = (
  participant: Pick<ApiParticipant, 'user' | 'party' | 'victim'>,
) => {
  const user = useAppSelector(selectUser);

  return user && user.userPartiesWithVictims
    ? user.userPartiesWithVictims.some(
        ([partyId, victimId]) =>
          victimId === participant.user._id &&
          partyId === participant.party._id,
      )
    : false;
};

export default useIsVictim;
