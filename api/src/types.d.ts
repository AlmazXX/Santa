import { Types } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  token: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  googleId?: string;
}

export interface IParty {
  title: string;
  inviteUrl: string;
  image?: string;
  creator: Types.ObjectId;
}

export interface IParticipant {
  user: Types.ObjectId;
  party: Types.ObjectId;
  victim: Types.ObjectId;
}
