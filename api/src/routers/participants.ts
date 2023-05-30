import { Router } from 'express';
import { Error } from 'mongoose';
import auth, { RequestWithUser } from '../middlewares/auth';
import Participant from '../models/Participant';
import Party from '../models/Party';
import { IParticipant, PageLimit, switchToString } from '../types';

type SearchParam = Partial<switchToString<IParticipant> & PageLimit>;

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
    const { page, limit, ...params }: SearchParam = req.query;
    const p = page ? parseInt(page) : 1;
    const l = limit ? parseInt(limit) : 10;

    const totalCount = await Participant.count(params);
    const skip = (p - 1) * l;

    const participants = await Participant.find(params)
      .populate('user', 'email firstname lastname avatar')
      .populate('party', 'title creator image')
      .skip(skip)
      .limit(l);

    return res.send({
      message: 'Participants are found',
      result: { participants, currentPage: p, totalCount },
    });
  } catch (error) {
    return next(error);
  }
});

participantRouter.post('/:party/gamble', auth, async (req, res, next) => {
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
      .populate('user', 'email firstname lastname avatar')
      .populate('party', 'title image')
      .populate('victim', 'email firstname lastname avatar');

    participants.sort(() => Math.random() - 0.5);
    const n = participants.length;

    for (let i = 0; i < n; ++i) {
      const santa = participants[i];
      santa.victim = participants[(i + 1) % n].user;
      santa.save();
    }

    await Party.findByIdAndUpdate(
      partyId,
      { gambled: true },
      { new: true, runValidators: true },
    );

    return res.send({ message: 'Matches prepared', result: participants });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default participantRouter;
