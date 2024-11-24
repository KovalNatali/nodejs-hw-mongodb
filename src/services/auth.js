import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../constants/index.js';
import { sendEmail } from '../utils/emailClient.js';

import {
  ACCESS_TOKEN_LIVE_TIME,
  REFRESH_TOKEN_LIVE_TIME,
} from '../constants/time.js';

// import { generateResetPasswordEmail } from '../utils/generateResetPaswordEmail.js';

const createSession = () => ({
  accessToken: crypto.randomBytes(24).toString('base64'),
  refreshToken: crypto.randomBytes(24).toString('base64'),
  accessTokenValidUntil: Date.now() + ACCESS_TOKEN_LIVE_TIME,
  refreshTokenValidUntil: Date.now() + REFRESH_TOKEN_LIVE_TIME,
});

const findUserByEmail = async (email) => await User.findOne({ email });

export const registerUser = async (payload) => {
  let user = await findUserByEmail(payload.email);

  if (user) {
    throw createHttpError(409, 'User with this email already registered!');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  user = await User.create({ ...payload, password: hashedPassword });

  return user;
};

export const loginUser = async (payload) => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const arePasswordsEqual = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!arePasswordsEqual) {
    throw createHttpError(401, 'User email or password is incorrect!');
  }

  await Session.deleteOne({ userId: user._id });

  const session = await Session.create({
    userId: user._id,
    ...createSession(),
  });

  return session;
};

export const logoutUser = async (sessionId, sessionToken) => {
  await Session.deleteOne({ _id: sessionId, refreshToken: sessionToken });
};

export const refreshSession = async (sessionId, sessionToken) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const now = new Date();

  if (session.refreshTokenValidUntil < now) {
    throw createHttpError(401, 'Refresh token expired');
  }

  await Session.deleteOne({ _id: sessionId, refreshToken: sessionToken });

  const newcreateSession = await Session.create({
    userId: session.userId,
    ...createSession(),
  });
  return newcreateSession;
};

export const sendResetPasswordToken = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    { expiresIn: '15m' },
  );
  try {
    await sendEmail({
      from: env(ENV_VARS.SMTP_FROM),
      to: email,
      subject: 'Reset your password!',
      html: `<p>Click <a href="${resetToken}">here</a>to reset your password! </p>`,
    });
  } catch (error) {
    console.log(error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }

  // try {
  //   await emailClient.sendEmail({
  //     from: env(ENV_VARS.SMTP_FROM),
  //     to: email,
  //     html: generateResetPasswordEmail({
  //       name: user.name,
  //       resetLink: 'https://google.com ',
  //     }),
  //     subject: 'Reset your password!',
  //   });
  // } catch (err) {
  //   console.log(err);
  //   throw createHttpError(
  //     500,
  //     'Failed to send the email, please try again later.',
  //   );
  // }
};
