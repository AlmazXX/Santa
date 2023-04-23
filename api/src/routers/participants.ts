import { Router } from 'express';
import auth, { RequestWithUser } from '../middlewares/auth';
import Participant from '../models/Participant';
import Party from '../models/Party';

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
    return next(error);
  }
});

participantRouter.get('/', async (req, res, next) => {
  try {
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;

    const totalParticipantCount = await Participant.count();
    const totalPages = Math.ceil(totalParticipantCount);
    const skip = (page - 1) * limit;

    const participants = await Participant.find()
      .populate('user', 'email fisrtName lastName avatar')
      .populate('party', 'title image')
      .skip(skip)
      .limit(limit);

    return res.send({
      message: 'Participants are found',
      result: { participants, currentPage: page, totalPages },
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
    return next(error);
  }
});

export default participantRouter;
