import { model, Schema, Types } from 'mongoose';
import { IWishlist } from '../types';
import Party from './Party';
import User from './User';

const WishlistSchema = new Schema<IWishlist>(
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
    title: {
      type: String,
      required: true,
    },
    address: String,
    image: String,
    description: String,
  },
  { timestamps: true },
);

const Wishlist = model<IWishlist>('Wishlist', WishlistSchema);
export default Wishlist;
