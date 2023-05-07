import Layout from '@/components/UI/Layout/Layout';
import Parties from '@/features/Party/Parties';
import { Grid } from '@mui/material';
import React from 'react';

const index = () => {
  return (
    <Layout>
      <Grid container>
        <Grid item>
          <Parties />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default index;
