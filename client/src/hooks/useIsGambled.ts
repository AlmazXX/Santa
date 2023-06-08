import { selectSingleParty } from '@/dispatchers/party/partiesSlice';
import { useAppSelector } from '@/store/hooks';

const useIsGambled = () => {
  const party = useAppSelector(selectSingleParty);

  return party ? party.gambled : false;
};

export default useIsGambled;
