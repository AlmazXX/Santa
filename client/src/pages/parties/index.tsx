import Layout from '@/components/UI/Layout/Layout';
import { getParties } from '@/dispatchers/party/partiesThunk';
import Parties from '@/features/Party/Parties';
import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';

const index = () => {
  return (
    <Layout>
      <Parties />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(getParties());

    return { props: {} };
  });

export default index;
