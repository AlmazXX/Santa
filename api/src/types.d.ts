import { Types } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  token: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  googleId?: string;
}

export interface IParty {
  title: string;
  inviteUrl: string;
  image?: string;
  gambled?: boolean;
  creator: Types.ObjectId;
}

export interface IParticipant {
  user: Types.ObjectId;
  party: Types.ObjectId;
  victim: Types.ObjectId;
}

export interface IWishlist {
  user: Types.ObjectId;
  party: Types.ObjectId;
  title: string;
  address?: string;
  image?: string;
  description?: string;
}

type switchToString<T> = {
  [P in keyof T]: string;
};

interface PageLimit {
  page: string;
  limit: string;
}
