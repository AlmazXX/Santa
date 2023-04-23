import { randomUUID } from 'crypto';
import { Router } from 'express';
import { Error } from 'mongoose';
import { imageUpload } from '../configs/multer';
import auth, { RequestWithUser } from '../middlewares/auth';
import Party from '../models/Party';

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

      return res.send({ message: 'Party is created', result: party });
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(400).send(error);
      } else {
        return next(error);
      }
    }
  },
);

partyRouter.get('/', async (req, res, next) => {
  try {
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;

    const totalPartiesCount = await Party.count();
    const totalPages = Math.ceil(totalPartiesCount);

    const skip = (page - 1) * limit;

    const parties = await Party.find().skip(skip).limit(limit);

    return res.send({
      message: 'Parties are found',
      result: { parties, currentPage: page, totalPages },
    });
  } catch (error) {
    return next(error);
  }
});

partyRouter.get('/:invite', async (req, res, next) => {
  try {
    const inviteUrl = req.params.invite as string;
    const party = await Party.findOne({ inviteUrl });

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
      } else {
        return next(error);
      }
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

    if (!party) {
      return res.status(404).send('Party is not found');
    }

    if (!party.creator.equals(user._id)) {
      return res
        .status(403)
        .send({ error: 'You are not creator of the party' });
    }

    const deletedParty = await Party.findByIdAndDelete(partyId);

    return res.send({ message: 'Party is deleted', result: deletedParty });
  } catch (error) {
    return next(error);
  }
});

export default partyRouter;
