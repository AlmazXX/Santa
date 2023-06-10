import { closeChat, selectChatIsOpen } from '@/dispatchers/chat/chatSlice';
import styles from '@/features/Chat/Chat.module.css';
import useChat from '@/hooks/useChat';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Box,
  Button,
  Dialog,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {
  party: string;
}
const Chat: React.FC<Props> = ({ party }) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectChatIsOpen);
  const { users, messages, oneMessage, onMessageChange, sendMessage } =
    useChat(party);

  const onClose = () => {
    dispatch(closeChat());
  };

  return (
    <Dialog open={isOpen} onClose={onClose} style={{ padding: '15px' }}>
      <Box className={styles.chatBox}>
        <Box className={styles.usersBox}>
          <List>
            {users.map((user) => (
              <ListItem key={user.id}>{user.displayName}</ListItem>
            ))}
          </List>
        </Box>
        <Box className={styles.messageBox}>
          <Box className={styles.messages}>
            {messages.map((message) => (
              <Typography key={message._id}>
                <strong>{message.user.firstname}</strong> {message.text}
              </Typography>
            ))}
          </Box>
          <form onSubmit={sendMessage} style={{ justifySelf: 'end' }}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item flex={1}>
                <TextField
                  label="message"
                  value={oneMessage}
                  onChange={onMessageChange}
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained">
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Chat;
