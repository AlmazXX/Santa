import { selectUser } from '@/dispatchers/user/usersSlice';
import { useAppSelector } from '@/store/hooks';
import { ActiveUser, ChatMessage, IncomingMessage } from '@/types';
import React from 'react';

const useChat = (id: string) => {
  const user = useAppSelector(selectUser);
  const [users, setUsers] = React.useState<ActiveUser[]>([]);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [message, setMessage] = React.useState('');

  const ws = React.useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket('ws://localhost:8000/chat/' + id);

    ws.current.onclose = (e) => {
      console.log(
        'Connection closed with code:',
        e.code,
        'and reason:',
        e.reason,
      );
      setTimeout(connectWebSocket, 10000);
    };

    ws.current.onopen = () => {
      if (user && ws.current) {
        ws.current.send(
          JSON.stringify({
            type: 'LOGIN',
            payload: { user: user.token, party: id },
          }),
        );
      }
    };

    ws.current.onmessage = (e) => {
      const decodedMessage = <IncomingMessage>JSON.parse(e.data);

      if (decodedMessage.type === 'NEW_MESSAGE') {
        setMessages((prev) => [...prev, <ChatMessage>decodedMessage.payload]);
      }

      if (decodedMessage.type === 'ACTIVE_USER_LIST') {
        setUsers(<ActiveUser[]>decodedMessage.payload);
      }

      if (decodedMessage.type === 'INITIAL_MESSAGES') {
        console.log('initial messages received');

        setMessages(<ChatMessage[]>decodedMessage.payload);
      }
    };
  };

  React.useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [user]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ws.current) return;

    ws.current.send(
      JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: message,
      }),
    );

    setMessage('');
  };

  const onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return { users, messages, oneMessage: message, onMessageChange, sendMessage };
};

export default useChat;
