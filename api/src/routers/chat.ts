import { randomUUID } from 'crypto';
import { Router } from 'express';
import { HydratedDocument } from 'mongoose';
import { WebSocket } from 'ws';
import Message from '../models/Message';
import User from '../models/User';
import { IncomingMessage, IUser } from '../types';

interface ActiveConnections {
  [id: string]: WebSocket;
}

export interface ActiveUsers {
  [id: string]: HydratedDocument<IUser> | null;
}

const chatRouter = () => {
  const router = Router();

  const activeConnections: ActiveConnections = {};
  const activeUsers: ActiveUsers = {};

  router.ws('/', async (ws) => {
    const id = randomUUID();
    console.log('client connected! id:', id);

    activeConnections[id] = ws;

    let user: HydratedDocument<IUser> | null = null;

    const lastMessages = await Message.find()
      .sort({ _id: -1 })
      .limit(30)
      .populate('user', 'firstname lastname');

    ws.send(
      JSON.stringify({
        type: 'INITIAL MESSAGES',
        payload: lastMessages.reverse(),
      }),
    );

    ws.on('message', async (msg) => {
      const decodedMessage = <IncomingMessage>JSON.parse(msg.toString());

      switch (decodedMessage.type) {
        case 'LOGIN':
          user = await User.findOne({ token: decodedMessage.payload });

          activeUsers[id] = user;
          sendActiveUsers();
          break;
        case 'SEND_MESSAGE':
          if (!user) break;

          const message = await Message.create({
            user: user._id,
            text: decodedMessage.payload,
          });

          const populatedMessage = await message.populate(
            'user',
            'firstname lastname',
          );

          broadcast(
            JSON.stringify({
              type: 'NEW_MESSAGE',
              payload: populatedMessage,
            }),
          );
          break;
      }
    });

    ws.on('close', () => {
      console.log('client disconnected! id:', id);
      delete activeConnections[id];
      delete activeUsers[id];

      sendActiveUsers();
    });

    const sendActiveUsers = () => {
      const usersList = Object.values(activeUsers).map((user) => ({
        id: user?._id,
        displayName: `${user?.firstname} ${user?.lastname}`,
      }));

      broadcast(
        JSON.stringify({ type: 'ACTIVE_USER_LIST', payload: usersList }),
      );
    };

    const broadcast = (msg: string) => {
      Object.keys(activeConnections).forEach((id) => {
        const conn = activeConnections[id];
        conn.send(msg);
      });
    };
  });

  return router;
};

export default chatRouter;
