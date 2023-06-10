import { model, Schema, Types } from 'mongoose';
import { IMessage } from '../types';
import Party from './Party';
import User from './User';

const MessageSchema = new Schema<IMessage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => await User.findById(value),
        message: 'User does not exist',
      },
    },
    party: {
      type: Schema.Types.ObjectId,
      ref: 'Party',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => await Party.findById(value),
        message: 'Party does not exist',
      },
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Message = model<IMessage>('Message', MessageSchema);
export default Message;
