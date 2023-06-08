import FileUpload from '@/components/UI/FileUpload/FileUpload';
import { selectWishlistSubmitting } from '@/dispatchers/wishlist/wishlistsSlice';
import { useAppSelector } from '@/store/hooks';
import { IWishlist } from '@/types';
import SendIcon from '@mui/icons-material/Send';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import React from 'react';

interface Props {
  party?: string;
  existingWishItem?: IWishlist;
  onSubmit: (wishItem: IWishlist) => void;
}

const initialState = {
  party: '',
  title: '',
  address: '',
  image: null,
  description: '',
};

const WishlistForm: React.FC<Props> = ({
  party,
  existingWishItem = initialState,
  onSubmit,
}) => {
  const submitting = useAppSelector(selectWishlistSubmitting);
  const [state, setState] = React.useState<IWishlist>({
    ...existingWishItem,
    party: party ? party : '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
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
        <Grid item>
          <Button
            type="submit"
            color="success"
            variant="contained"
            endIcon={submitting ? <CircularProgress /> : <SendIcon />}
          >
            Add to wishlist
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default WishlistForm;
