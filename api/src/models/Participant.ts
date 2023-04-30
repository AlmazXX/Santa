import { model, Schema, Types } from 'mongoose';
import { IParticipant } from '../types';
import Party from './Party';
import User from './User';

const ParticipantSchema = new Schema<IParticipant>(
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
    victim: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      validate: {
        validator: async (value: Types.ObjectId) => await User.findById(value),
        message: 'User does not exist',
      },
    },
  },
  { timestamps: true },
);

const Participant = model<IParticipant>('Participant', ParticipantSchema);
export default Participant;
