import { randomUUID } from 'crypto';
import { Router } from 'express';
import { Error } from 'mongoose';
import { imageUpload } from '../configs/multer';
import auth, { RequestWithUser } from '../middlewares/auth';
import Participant from '../models/Participant';
import Party from '../models/Party';
import Wishlist from '../models/Wishlist';
import { IParty, PageLimit, switchToString } from '../types';

type SearchParam = Partial<
  switchToString<Pick<IParty, 'title' | 'creator'>> & PageLimit
>;

const partyRouter = Router();

partyRouter.post(
  '/',
  auth,
  imageUpload.single('image'),
  async (req, res, next) => {
    try {
      const { user } = req as RequestWithUser;

      const party = await Party.create({
        title: req.body.title,
        creator: user._id,
        image: req.file ? req.file.filename : null,
        inviteUrl: randomUUID(),
      });

      await Participant.create({
        party: party._id,
        user: user._id,
      });

      return res.send({ message: 'Party is created', result: party });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).send(error);
      }
      return next(error);
    }
  },
);

partyRouter.get('/', async (req, res, next) => {
  try {
    const { page, limit, ...params }: SearchParam = req.query;
    const p = page ? parseInt(page) : 1;
    const l = limit ? parseInt(limit) : 10;

    const totalCount = await Party.count(params);
    const skip = (p - 1) * l;

    const parties = await Party.find(params).skip(skip).limit(l);

    return res.send({
      message: 'Parties are found',
      result: { parties, currentPage: p, totalCount },
    });
  } catch (error) {
    return next(error);
  }
});

partyRouter.get('/:id', async (req, res, next) => {
  try {
    const partyId = <string>req.params.id;

    const party = await Party.findById(partyId);

    if (!party) {
      return res.status(404).send({ error: 'Party is not found' });
    }

    return res.send({ message: 'Party is found', result: party });
  } catch (error) {
    return next(error);
  }
});

partyRouter.put(
  '/:id',
  auth,
  imageUpload.single('image'),
  async (req, res, next) => {
    try {
      const { user } = req as RequestWithUser;
      const partyId = req.params.id;

      if (!partyId) {
        return res.status(400).send({ error: 'Party ID is required' });
      }

      const party = await Party.findById(partyId);

      if (!party) {
        return res.status(404).send('Party is not found');
      }

      if (!party.creator.equals(user._id)) {
        return res
          .status(403)
          .send({ error: 'You are not creator of the party' });
      }

      if (req.body.title) {
        party.title = req.body.title;
      }

      if (req.file) {
        party.image = req.file.filename;
      }

      await party.save();

      return res.send({ message: 'Party is update', result: party });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).send(error);
      }
      return next(error);
    }
  },
);

partyRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;
    const partyId = req.params.id;

    if (!partyId) {
      return res.status(400).send({ error: 'Party ID is required' });
    }

    const party = await Party.findById(partyId);

    if (party && !party.creator.equals(user._id)) {
      return res
        .status(403)
        .send({ error: 'You are not creator of the party' });
    }

    const deletedParty = await Party.findByIdAndDelete(partyId);

    if (deletedParty) {
      await Participant.deleteMany({ party: deletedParty._id });
      await Wishlist.deleteMany({ party: deletedParty._id });
    }

    return res.send({ message: 'Party is deleted', result: deletedParty });
  } catch (error) {
    return next(error);
  }
});

export default partyRouter;
