import { model, Schema, Types } from 'mongoose';
import { IParty } from '../types';
import User from './User';

const PartySchema = new Schema<IParty>(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => await User.findById(value),
        message: 'User does not exist',
      },
    },
    inviteUrl: {
      type: String,
      required: true,
    },
    image: String,
  },
  { timestamps: true },
);

const Party = model<IParty>('Party', PartySchema);
export default Party;
