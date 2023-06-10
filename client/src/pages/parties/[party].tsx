import Layout from '@/components/UI/Layout/Layout';
import { getParticipants } from '@/dispatchers/participant/participantsThunk';
import { selectSingleParty } from '@/dispatchers/party/partiesSlice';
import { getSingleParty } from '@/dispatchers/party/partiesThunk';
import Chat from '@/features/Chat/Chat';
import ChatButton from '@/features/Chat/ChatButton';
import Participants from '@/features/Participant/Participants';
import PartyItem from '@/features/Party/components/PartyItem';
import { useAppSelector } from '@/store/hooks';
import { wrapper } from '@/store/store';
import { Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

const SingleParty: React.FC = () => {
  const party = useAppSelector(selectSingleParty);

  return (
    <Layout>
      <Grid container direction="column" alignItems="baseline" spacing={1}>
        {party && (
          <Grid item style={{ width: '100%' }}>
            <PartyItem party={party} isBanner={true} />
          </Grid>
        )}
        <Grid item>
          <Participants />
        </Grid>
      </Grid>
      {party && (
        <>
          <Chat party={party._id} />
          <ChatButton />
        </>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    const { party } = params as { party: string };

    await store.dispatch(getSingleParty(party));
    await store.dispatch(getParticipants({ party }));

    return { props: {} };
  });

export default SingleParty;
