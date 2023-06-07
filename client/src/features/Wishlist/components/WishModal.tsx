import {
  closeWishModal,
  selectWishItem,
  selectWishModalIsOpen,
  setWishItem,
} from '@/dispatchers/wishlist/wishlistsSlice';
import useImageSrc from '@/hooks/useImageSrc';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const WishModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const wishItem = useAppSelector(selectWishItem);
  const isOpen = useAppSelector(selectWishModalIsOpen);

  if (!wishItem) {
    return null;
  }

  const wishImage = useImageSrc(wishItem.image);

  const onClose = () => {
    dispatch(closeWishModal());
    dispatch(setWishItem(null));
  };

  const onBackdropCLick = (_e: Record<never, never>, reason: string) => {
    if (reason === 'backdropClick') {
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      maxWidth="xs"
      fullWidth={true}
      onClose={onBackdropCLick}
    >
      <Grid container padding={2} spacing={2} direction="column">
        <Grid item>
          <Typography variant="h6">{wishItem.title}</Typography>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
        {wishImage && (
          <Grid
            item
            margin="16px 0 0 16px"
            position="relative"
            width="min(300px, 100vw)"
            height="min(200px,100vh)"
          >
            <Image
              src={wishImage}
              alt={wishItem.title}
              fill
              sizes="100%"
              priority
              style={{
                objectFit: 'cover',
                objectPosition: 'left',
                borderRadius: 5,
              }}
            />
          </Grid>
        )}
        <Grid item container direction="column">
          {wishItem.address && (
            <Grid item>
              <Typography variant="body2">
                <strong>Place to buy</strong> {wishItem.address}
              </Typography>
            </Grid>
          )}
        </Grid>
        {wishItem.description && (
          <Grid item>
            <Typography variant="body2">{wishItem.description}</Typography>
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
};

export default WishModal;
