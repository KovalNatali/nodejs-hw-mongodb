import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import { ENV_VARS, UPLOAD_DIR } from './constants/index.js';
import { errorHandler } from './widdlewares/errorHandler.js';
import { notFoundHandler } from './widdlewares/notFoundHandler.js';

import rootRouter from './routers/index.js';
import { swaggerDocs } from './widdlewares/swaggerDocs.js';

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

  app.use(cookieParser());

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/api-docs', swaggerDocs());

  app.use(rootRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
