import FileUpload from '@/components/UI/FileUpload/FileUpload';
import { closeForm } from '@/dispatchers/wishlist/wishlistsSlice';
import { useAppDispatch } from '@/store/hooks';
import { Button, Grid, TextField } from '@mui/material';
import React, { FormEvent } from 'react';

const WishlistForm = () => {
  const dispatch = useAppDispatch();

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(closeForm());
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField name="title" label="Item name" />
        </Grid>
        <Grid item>
          <TextField name="address" label="Place to buy" />
        </Grid>
        <Grid item>
          <FileUpload name="image" label="Image" onChange={() => {}} />
        </Grid>
        <Grid item>
          <TextField
            name="description"
            label="Description"
            multiline
            rows={3}
          />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <Button type="submit" color="success" variant="contained">
              Add to wishlist
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="error"
              variant="contained"
              onClick={() => dispatch(closeForm())}
            >
              close
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default WishlistForm;
