import {
  gambleParticipants,
  getParticipants,
} from '@/dispatchers/participant/participantsThunk';
import { useAppDispatch } from '@/store/hooks';
import React from 'react';

const useGamble = (id: string) => {
  const dispatch = useAppDispatch();

  return async () => {
    await dispatch(gambleParticipants(id));
    dispatch(getParticipants({ party: id }));
  };
};

export default useGamble;
