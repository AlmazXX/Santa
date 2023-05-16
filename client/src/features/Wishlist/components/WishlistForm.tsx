import FileUpload from '@/components/UI/FileUpload/FileUpload';
import { closeForm } from '@/dispatchers/wishlist/wishlistsSlice';
import { useAppDispatch } from '@/store/hooks';
import { IWishlist } from '@/types';
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';

interface Props {
  party: string;
}

const WishlistForm: React.FC<Props> = ({ party }) => {
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState<IWishlist>({
    party,
    title: '',
    address: '',
    image: null,
    description: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    console.log(state);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(closeForm());
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            name="title"
            label="Item name"
            value={state.title}
            onChange={onChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="address"
            label="Place to buy"
            value={state.address}
            onChange={onChange}
          />
        </Grid>
        <Grid item>
          <FileUpload name="image" label="Image" onChange={onFileChange} />
        </Grid>
        <Grid item>
          <TextField
            name="description"
            label="Description"
            multiline
            rows={3}
            value={state.description}
            onChange={onChange}
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
