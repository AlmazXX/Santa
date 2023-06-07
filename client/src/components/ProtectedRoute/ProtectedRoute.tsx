import { useRouter } from 'next/router';
import React from 'react';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!isAllowed) {
      void router.push('/login');
    }
  }, []);

  return <>{isAllowed ? children : null}</>;
};

export default ProtectedRoute;
