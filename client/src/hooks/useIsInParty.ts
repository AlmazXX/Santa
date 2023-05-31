import { selectUser } from '@/dispatchers/user/usersSlice';
import { useAppSelector } from '@/store/hooks';

const useUserInParty = (id: string) => {
  const user = useAppSelector(selectUser);

  return user && user.userPartiesWithVictims
    ? user.userPartiesWithVictims.some(([partyId]) => partyId === id)
    : false;
};

export default useUserInParty;
