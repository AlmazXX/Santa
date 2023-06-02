import Card from '@/components/UI/Card/Card';
import useImageSrc from '@/hooks/useImageSrc';
import { ApiWishlist } from '@/types';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import WishModal from './WishModal';

interface Props {
  wishItem: ApiWishlist;
}

const WishItem: React.FC<Props> = ({ wishItem }) => {
  const wishImage = useImageSrc(wishItem.image);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card image={wishImage}>
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          position="relative"
          zIndex={2}
          p={2}
        >
          <Grid item>
            <Typography variant="h6">{wishItem.title}</Typography>
          </Grid>
          <Button onClick={openModal} style={{ marginLeft: '-8px' }}>
            See full
          </Button>
        </Grid>
      </Card>
      <WishModal
        wishItem={wishItem}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default WishItem;
