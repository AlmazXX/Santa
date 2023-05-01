import React from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';

const AnonMenu = () => {
  return (
    <>
      <Button component={Link} href="/register" color="inherit">
        sign up
      </Button>
      <Button component={Link} href="/login" color="inherit">
        sign in
      </Button>
    </>
  );
};

export default AnonMenu;
