import { IconButton } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import style from './AddButton.module.css';

interface Props extends PropsWithChildren {
  shouldRender: boolean;
  background?: string;
  onClick?: () => void;
}

const AddButton: React.FC<Props> = ({
  shouldRender,
  background,
  onClick,
  children,
}) => {
  if (shouldRender) {
    return (
      <IconButton
        onClick={onClick}
        className={style.button}
        style={{ background }}
      >
        {children}
      </IconButton>
    );
  }

  return null;
};

export default AddButton;
