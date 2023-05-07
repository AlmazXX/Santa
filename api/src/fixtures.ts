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
    await db.dropCollection('users');
    await db.dropCollection('parties');
    await db.dropCollection('participants');
    await db.dropCollection('wishlists');
  } catch {
    console.log('Collections were not present, skipping drop...');
  }
  const [Hans, Kristoff, Anna, Sven] = await User.create(
    {
      email: 'hans@gmail.com',
      password: '123',
      token: randomUUID(),
      firstname: 'Hans',
    },
    {
      email: 'kristoff@gmail.com',
      password: '123',
      token: randomUUID(),
      firstname: 'Kristoff',
    },
    {
      email: 'anna@gmail.com',
      password: '123',
      token: randomUUID(),
      firstname: 'Anna',
    },
    {
      email: 'sven@gmail.com',
      password: '123',
      token: randomUUID(),
      firstname: 'Sven',
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
      victim: Kristoff._id,
    },
    {
      user: Kristoff._id,
      party: frozen._id,
      victim: Anna._id,
    },
    {
      user: Anna._id,
      party: frozen._id,
      victim: Sven._id,
    },
    {
      user: Sven._id,
      party: frozen._id,
      victim: Hans._id,
    },
  );

  await Wishlist.create(
    {
      user: Hans._id,
      party: frozen._id,
      title: 'Kingdom',
    },
    {
      user: Hans._id,
      party: frozen._id,
      title: 'Fewer brothers',
    },
    {
      user: Kristoff._id,
      party: frozen._id,
      title: 'Sleigh',
    },
    {
      user: Kristoff._id,
      party: frozen._id,
      title: 'Ice',
    },
    {
      user: Anna._id,
      party: frozen._id,
      title: 'Sister',
    },
    {
      user: Anna._id,
      party: frozen._id,
      title: 'Sweet cake',
    },
    {
      user: Sven._id,
      party: frozen._id,
      title: 'Carrot',
    },
    {
      user: Sven._id,
      party: frozen._id,
      title: 'Salt',
    },
  );

  await db.close();
};

void run();
