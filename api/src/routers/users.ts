import { randomUUID } from 'crypto';
import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { Error } from 'mongoose';
import config from '../configs/config';
import { imageUpload } from '../configs/multer';
import downloadFile from '../helpers/downloadImg';
import User from '../models/User';

const userRouter = Router();
const client = new OAuth2Client(config.google.clientId);

userRouter.post('/', imageUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();
    await user.save();
    return res.send({ message: 'Registered successfully', result: user });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

userRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Wrong Google token!' });
    }

    const email = payload['email'];
    const googleId = payload['sub'];
    const firstname = payload['given_name'];
    const lastname = payload['family_name'];
    const avatarUrl = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data' });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      const avatar =
        'images/' + (await downloadFile(avatarUrl as string, 'images'));

      user = new User({
        email,
        password: randomUUID(),
        firstname,
        lastname,
        avatar,
        googleId,
      });
    }

    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with Google successful', result: user });
  } catch (e) {
    return next(e);
  }
});

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ error: 'Username not found' });
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({ error: 'Password is wrong' });
    }

    user.generateToken();
    await user.save();
    return res.send({
      message: 'Username and password are correct!',
      result: user,
    });
  } catch (e) {
    return next(e);
  }
});

userRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authotrization');
    const success = { message: 'OK' };

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default userRouter;
