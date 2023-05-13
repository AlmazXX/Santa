import FileUpload from '@/components/UI/FileUpload/FileUpload';
import {
  selectPartiesError,
  selectPartiesSubmitting,
} from '@/dispatchers/party/partiesSlice';
import { useAppSelector } from '@/store/hooks';
import { IParty, ValidationError } from '@/types';
import SendIcon from '@mui/icons-material/Send';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import React from 'react';

interface Props {
  existingParty?: IParty;
  onSubmit: (party: IParty) => void;
}

const initialState = { title: '', image: null };

const PartyForm: React.FC<Props> = ({
  existingParty = initialState,
  onSubmit,
}) => {
  const submitting = useAppSelector(selectPartiesSubmitting);
  const error = useAppSelector(selectPartiesError) as ValidationError;
  const [state, setState] = React.useState<IParty>(existingParty);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setState((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <TextField
            name="title"
            label="Title"
            value={state.title}
            onChange={onChange}
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
            // required
          />
        </Grid>
        <Grid item>
          <FileUpload name="image" label="Image" onChange={onFileChange} />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="success"
            endIcon={submitting ? <CircularProgress /> : <SendIcon />}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PartyForm;
