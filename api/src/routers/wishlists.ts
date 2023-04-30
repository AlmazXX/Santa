import { Router } from 'express';
import { Error, Types } from 'mongoose';
import { imageUpload } from '../configs/multer';
import auth, { RequestWithUser } from '../middlewares/auth';
import Wishlist from '../models/Wishlist';
import { IWishlist } from '../types';

const wishlistRouter = Router();

wishlistRouter.post(
  '/',
  auth,
  imageUpload.single('image'),
  async (req, res, next) => {
    try {
      const wishlistItem = await Wishlist.create({
        party: req.body.party,
        title: req.body.title,
        address: req.body.address,
        image: req.file ? req.file.filename : null,
        description: req.body.description,
      });

      return res.send({
        message: 'Wishlist item is created',
        result: wishlistItem,
      });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).send(error);
      }
      return next(error);
    }
  },
);

wishlistRouter.get('/', async (req, res, next) => {
  try {
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;
    const { party, user } = req.query;

    const searchParam = Object.entries({ party, user })
      .filter(([_, value]) => value !== undefined)
      .reduce<Partial<Pick<IWishlist, 'party' | 'user'>>>(
        (acc, [key, value]) => {
          acc[key as keyof Pick<IWishlist, 'party' | 'user'>] =
            new Types.ObjectId(value as string);
          return acc;
        },
        {},
      );

    const totalCount = await Wishlist.count(searchParam);
    const skip = (page - 1) * limit;

    const wishlist = await Wishlist.find(searchParam).skip(skip).limit(limit);

    res.send({
      message: 'Wishlist is found',
      result: wishlist,
      currentPage: page,
      totalCount,
    });
  } catch (error) {
    return next(error);
  }
});

wishlistRouter.get('/:id', async (req, res, next) => {
  try {
    const wishlistItemId = req.params.id;
    const wishlistItem = await Wishlist.findById(wishlistItemId);

    if (!wishlistItem) {
      return res.status(404).send({ error: 'Wishlist item is not found' });
    }

    return res.send({
      message: 'Wishlist item is found',
      result: wishlistItem,
    });
  } catch (error) {
    return next(error);
  }
});

wishlistRouter.put(
  '/:id',
  auth,
  imageUpload.single('image'),
  async (req, res, next) => {
    try {
      const { user } = req as RequestWithUser;
      const wishlistItemId = req.params.id;
      const { party, title, address, description } = req.body;
      const image = req.file ? req.file.filename : null;

      if (!wishlistItemId) {
        return res.status(400).send({ error: 'Wishlist item id is required' });
      }

      const wishlistItem = await Wishlist.findById(wishlistItemId);

      if (!wishlistItem) {
        return res.status(404).send({ error: 'Wishlist item is not found' });
      }

      if (!wishlistItem.user.equals(user._id)) {
        return res
          .status(403)
          .send({ error: 'You are not owner of the wishlist' });
      }

      const updatedWishlistItem = await Wishlist.findByIdAndUpdate(
        wishlistItemId,
        { party, title, address, description, image },
        { new: true, runValidators: true },
      );

      return res.send({
        message: 'Wishlist item is updated',
        result: updatedWishlistItem,
      });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).send(error);
      }
      return next(error);
    }
  },
);

wishlistRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;
    const wishlistItemId = req.params.id;

    if (!wishlistItemId) {
      return res.status(400).send({ error: 'Wishlist item id is required' });
    }

    const wishlistItem = await Wishlist.findById(wishlistItemId);

    if (!wishlistItem) {
      return res.status(404).send({ error: 'Wishlist item is not found' });
    }

    if (!wishlistItem.user.equals(user._id)) {
      return res
        .status(403)
        .send({ error: 'You are not owner of the wishlist' });
    }

    const deletedWishlistItem = await Wishlist.findByIdAndDelete(
      wishlistItemId,
    );

    return res.send({
      message: 'Wishlist item is deleted',
      result: deletedWishlistItem,
    });
  } catch (error) {
    return next(error);
  }
});

export default wishlistRouter;
