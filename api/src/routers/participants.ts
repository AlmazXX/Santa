import { Router } from 'express';
import { Error, Types } from 'mongoose';
import auth, { RequestWithUser } from '../middlewares/auth';
import Participant from '../models/Participant';
import Party from '../models/Party';
import { IParticipant } from '../types';

const participantRouter = Router();

participantRouter.post('/', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;

    const participant = await Participant.create({
      user: user._id,
      party: req.body.party,
    });

    await participant.populate('user', 'email fisrtName lastName avatar');
    await participant.populate('party', 'title image');

    return res.send({ message: 'User joined the party', result: participant });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

participantRouter.get('/', async (req, res, next) => {
  try {
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;
    const { user, party, victim } = req.query;

    const searchParam = Object.entries({ user, party, victim })
      .filter(([_, value]) => value !== undefined)
      .reduce<Partial<IParticipant>>((acc, [key, value]) => {
        acc[key as keyof IParticipant] = new Types.ObjectId(value as string);
        return acc;
      }, {});

    const totalCount = await Participant.count(searchParam);
    const skip = (page - 1) * limit;

    const participants = await Participant.find(searchParam)
      .populate('user', 'email fisrtName lastName avatar')
      .populate('party', 'title image')
      .skip(skip)
      .limit(limit);

    return res.send({
      message: 'Participants are found',
      result: { participants, currentPage: page, totalCount },
    });
  } catch (error) {
    return next(error);
  }
});

participantRouter.patch('/:party/gamble', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;
    const partyId = req.params.party;

    const party = await Party.findOne({ creator: user._id, _id: partyId });

    if (!party) {
      return res
        .status(403)
        .send({ error: 'You are not creator of the party' });
    }

    const participants = await Participant.find({ party: partyId })
      .populate('user', 'email fisrtName lastName avatar')
      .populate('party', 'title image')
      .populate('victim', 'email fisrtName lastName avatar');

    participants.sort(() => Math.random() - 0.5);
    const n = participants.length;

    for (let i = 0; i < n; ++i) {
      const santa = participants[i];
      santa.victim = participants[(i + 1) % n].user;
      santa.save();
    }

    return res.send({ message: 'Matches prepared', result: participants });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default participantRouter;
