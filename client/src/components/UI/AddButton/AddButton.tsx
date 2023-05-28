import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import React from 'react';
import style from './AddButton.module.css';

interface Props {
  onClick?: () => void;
}

const AddButton: React.FC<Props> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} className={style.button}>
      <AddIcon className={style.button__icon} />
    </IconButton>
  );
};

export default AddButton;
