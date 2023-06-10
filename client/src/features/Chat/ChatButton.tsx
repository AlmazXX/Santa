import { openChat } from '@/dispatchers/chat/chatSlice';
import { selectUser } from '@/dispatchers/user/usersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@mui/material';
import React from 'react';

const ChatButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onClick = () => {
    dispatch(openChat());
  };

  return user ? (
    <Button
      variant="contained"
      onClick={onClick}
      style={{ position: 'absolute', bottom: '50px', right: '50px' }}
    >
      Chat
    </Button>
  ) : null;
};

export default ChatButton;
