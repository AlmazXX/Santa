import { randomUUID } from 'crypto';
import mongoose from 'mongoose';
import config from './configs/config';
import Participant from './models/Participant';
import Party from './models/Party';
import User from './models/User';
import Wishlist from './models/Wishlist';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.collection('users').deleteMany({});
    await db.collection('parties').deleteMany({});
    await db.collection('participants').deleteMany({});
    await db.collection('wishlists').deleteMany({});
    await db.collection('messages').deleteMany({});
  } catch {
    console.log('Collections were not present, skipping drop...');
  }
  const [Hans, Kristoff, Anna, Sven] = await User.create(
    {
      email: 'hans@gmail.com',
      password: '123',
      token: randomUUID(),
      firstname: 'Hans',
      avatar: 'fixtures/Hans.png',
    },
    {
      email: 'kristoff@gmail.com',
      password: '123',
      token: randomUUID(),
      firstname: 'Kristoff',
      avatar: 'fixtures/Kristoff.png',
    },
    {
      email: 'anna@gmail.com',
      password: '123',
      token: randomUUID(),
      firstname: 'Anna',
      avatar: 'fixtures/Anna.png',
    },
    {
      email: 'sven@gmail.com',
      password: '123',
      token: randomUUID(),
      firstname: 'Sven',
      avatar: 'fixtures/Swen.png',
    },
  );

  const frozen = await Party.create({
    title: 'Frozen',
    inviteUrl: randomUUID(),
    creator: Anna._id,
    image: 'fixtures/frozen.jpeg',
  });

  await Participant.create(
    {
      user: Hans._id,
      party: frozen._id,
    },
    {
      user: Kristoff._id,
      party: frozen._id,
    },
    {
      user: Anna._id,
      party: frozen._id,
    },
    {
      user: Sven._id,
      party: frozen._id,
    },
  );

  await Wishlist.create(
    {
      user: Hans._id,
      party: frozen._id,
      title: 'Kingdom',
      image: 'fixtures/Arendelle.webp',
    },
    {
      user: Hans._id,
      party: frozen._id,
      title: 'Fewer brothers',
      image: 'fixtures/brothers.jpg',
    },
    {
      user: Kristoff._id,
      party: frozen._id,
      title: 'Sleigh',
      image: 'fixtures/sleigh.webp',
    },
    {
      user: Kristoff._id,
      party: frozen._id,
      title: 'Ice',
      image: 'fixtures/Ice.webp',
    },
    {
      user: Anna._id,
      party: frozen._id,
      title: 'Sister',
      image: 'fixtures/sister.webp',
    },
    {
      user: Anna._id,
      party: frozen._id,
      title: 'Sweet cake',
      image: 'fixtures/cake.jpg',
    },
    {
      user: Sven._id,
      party: frozen._id,
      title: 'Carrot',
      image: 'fixtures/carrot.jpg',
    },
    {
      user: Sven._id,
      party: frozen._id,
      title: 'Song',
      image: 'fixtures/song.webp',
    },
  );

  await db.close();
};

void run();
