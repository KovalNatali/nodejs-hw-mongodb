import nodemailer from 'nodemailer';

import { ENV_VARS } from '../constants/index.js';
import { env } from './env.js';

const transporter = nodemailer.createTransport({
  host: env(ENV_VARS.SMTP_HOST),
  port: env(ENV_VARS.SMTP_PORT),
  auth: {
    user: env(ENV_VARS.SMTP_USERNAME),
    pass: env(ENV_VARS.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
