import { Button } from '@mui/material';
import styles from './Chat.module.css';
import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { openChat } from '@/dispatchers/chat/chatSlice';

const ChatButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(openChat());
  };

  return (
    <Button variant="contained" onClick={onClick} className={styles.chatButton}>
      Chat
    </Button>
  );
};

export default ChatButton;
