import { selectUser } from '@/dispatchers/user/usersSlice';
import { useAppSelector } from '@/store/hooks';
import React from 'react';

const useIsCreator = (id: string) => {
  const user = useAppSelector(selectUser);

  return user && user.createdPartyIds
    ? user.createdPartyIds.some((partyId) => partyId === id)
    : false;
};

export default useIsCreator;
