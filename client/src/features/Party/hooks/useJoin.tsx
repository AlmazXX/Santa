import { joinParty } from '@/dispatchers/participant/participantsThunk';
import { selectUser } from '@/dispatchers/user/usersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IParticipant } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const useJoin = (party: string) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [state, setState] = useState<IParticipant>({ user: '', party });

  useEffect(() => {
    if (user) {
      setState((prev) => ({ ...prev, user: user._id }));
    }
  }, [user]);

  if (!user) {
    return () => {
      enqueueSnackbar(`Please log in to join the party`, {
        variant: 'info',
        action: () => (
          <Link href="/login" style={{ color: '#fff', fontWeight: 600 }}>
            Log in
          </Link>
        ),
        style: { paddingRight: '30px' },
      });
    };
  }

  return () => {
    dispatch(joinParty(state));
    router.push('/parties/' + party);
  };
};

export default useJoin;
