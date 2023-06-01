import { useAppDispatch } from '@/store/hooks';
import { AppThunk } from '@/store/store';

const useDispatchAction = (...actions: AppThunk[]) => {
  const dispatch = useAppDispatch();

  return async () => {
    for (const action of actions) {
      await dispatch(action);
    }
  };
};

export default useDispatchAction;
