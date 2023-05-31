import { selectUser } from '@/dispatchers/user/usersSlice';
import { useAppSelector } from '@/store/hooks';

const useCurrentVictim = (id: string) => {
  const user = useAppSelector(selectUser);
  const victim =
    user &&
    user.userPartiesWithVictims &&
    user.userPartiesWithVictims.find(([party]) => party === id);

  return victim ? victim[1] : undefined;
};

export default useCurrentVictim;
