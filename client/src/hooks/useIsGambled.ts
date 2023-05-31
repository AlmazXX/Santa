import { selectSingleParty } from '@/dispatchers/party/partiesSlice';
import { getSingleParty } from '@/dispatchers/party/partiesThunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';

const useIsGambled = (partyId: string) => {
  const dispatch = useAppDispatch();
  const party = useAppSelector(selectSingleParty);

  useEffect(() => {
    dispatch(getSingleParty(partyId));
  }, [dispatch, partyId]);

  return party ? party.gambled : false;
};

export default useIsGambled;
