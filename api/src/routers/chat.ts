import { randomUUID } from 'crypto';
import { Router } from 'express';
import { HydratedDocument } from 'mongoose';
import { WebSocket } from 'ws';
import Message from '../models/Message';
import Party from '../models/Party';
import User from '../models/User';
import {
  IMessage,
  IncomingMessage,
  IParty,
  IUser,
  switchToString,
} from '../types';

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

  router.ws('/:id', async (ws, req) => {
    const partyId = req.params.id;
    const id = randomUUID();
    console.log('client connected! id:', id);

    activeConnections[id] = ws;

    let user: HydratedDocument<IUser> | null = null;
    let party: HydratedDocument<IParty> | null = null;

    const lastMessages = await Message.find({ party: partyId })
      .sort({ _id: -1 })
      .limit(30)
      .populate('user', 'firstname');

    ws.send(
      JSON.stringify({
        type: 'INITIAL_MESSAGES',
        payload: lastMessages.reverse(),
      }),
    );

    ws.on('message', async (msg) => {
      const decodedMessage = <IncomingMessage>JSON.parse(msg.toString());

      switch (decodedMessage.type) {
        case 'LOGIN':
          const { user: token, party: partyId } = <
            switchToString<Pick<IMessage, 'user' | 'party'>>
          >decodedMessage.payload;

          user = await User.findOne({ token });
          party = await Party.findById(partyId);

          activeUsers[id] = user;
          sendActiveUsers(activeUsers);
          break;
        case 'SEND_MESSAGE':
          if (!user || !party) break;
          const message = await Message.create({
            user: user._id,
            party: party._id,
            text: decodedMessage.payload,
          });

          const populatedMessage = await message.populate('user', 'firstname');

          broadcast(
            JSON.stringify({
              type: 'NEW_MESSAGE',
              payload: populatedMessage,
            }),
          );
          break;
      }
    });

    ws.on('close', async () => {
      console.log('client disconnected! id:', id);
      await delete activeConnections[id];
      await delete activeUsers[id];

      sendActiveUsers(activeUsers);
    });

    const sendActiveUsers = (activeUsers: ActiveUsers) => {
      const usersList = Object.values(activeUsers).map((user) => ({
        id: user?._id,
        displayName: user?.firstname,
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
