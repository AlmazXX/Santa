import { IconButton } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import style from './AddButton.module.css';

interface Props {
  link?: string;
}

const AddButton: React.FC<Props> = ({ link }) => {
  return (
    <IconButton
      component={Link}
      href={link ? link : ''}
      className={style.button}
    >
      <AddIcon className={style.button__icon} />
    </IconButton>
  );
};

export default AddButton;
