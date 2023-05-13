import { selectParticipants } from '@/dispatchers/participant/participantsSlice';
import { getParticipants } from '@/dispatchers/participant/participantsThunk';
import { useAppSelector } from '@/store/hooks';
import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';
import React from 'react';

const singleParty = () => {
  const participants = useAppSelector(selectParticipants);

  return (
    <div>
      {participants.map((participant) => (
        <p key={participant._id}>{participant._id}</p>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    await store.dispatch(getParticipants(params ? params : {}));

    return { props: {} };
  });

export default singleParty;
