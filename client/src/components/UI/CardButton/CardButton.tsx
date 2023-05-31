import { IconButton } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import style from './CardButton.module.css';

interface Props extends PropsWithChildren {
  background?: string;
  onClick?: () => void;
}

const AddButton: React.FC<Props> = ({ background, onClick, children }) => {
  return (
    <IconButton
      onClick={onClick}
      className={style.button}
      style={{ background }}
    >
      {children}
    </IconButton>
  );
};

export default AddButton;
