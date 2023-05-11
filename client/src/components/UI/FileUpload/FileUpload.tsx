import { Button, Grid, TextField } from '@mui/material';
import React from 'react';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  required?: boolean;
  accept?: string;
  error?: boolean;
  helperText?: string;
}

const FileUpload: React.FC<Props> = ({
  onChange,
  name,
  label,
  required,
  accept,
  error,
  helperText,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [filename, setFilename] = React.useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(
      e.target.files && e.target.files[0] ? e.target.files[0].name : '',
    );
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
        required={required}
        accept={accept ? accept : 'image/*'}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            disabled
            label={label}
            value={filename}
            onClick={activateInput}
            required={required}
            error={error}
            helperText={helperText}
          />
        </Grid>
        <Grid item>
          <Button type="button" variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileUpload;
