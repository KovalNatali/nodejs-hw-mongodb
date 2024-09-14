import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { getAllContacts } from './services/contacts.js';
import { getContactById } from './services/contacts.js';

const PORT = Number(env(ENV_VARS.PORT, '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
    if (contact === null) {
      return res
        .status(404)
        .json({ status: 404, message: 'Contact not found' });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Not found' });
    next();
  });

  app.use('*', (err, req, res, next) => {
    res.status(500).json({ message: 'Route not found', error: err.message });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
