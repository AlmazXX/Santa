import cors from 'cors';
import express from 'express';
import expressWs from 'express-ws';
import mongoose from 'mongoose';
import config from './configs/config';
import chatRouter from './routers/chat';
import participantRouter from './routers/participants';
import partyRouter from './routers/parties';
import userRouter from './routers/users';
import wishlistRouter from './routers/wishlists';

const app = express();
const port = 8000;
expressWs(app);

app.use(cors());
app.use(express.json());
app.use(express.static('src/configs/public'));
app.use('/users', userRouter);
app.use('/parties', partyRouter);
app.use('/participants', participantRouter);
app.use('/wishlists', wishlistRouter);
app.use('/chat', chatRouter());

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log('We are live on', port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
