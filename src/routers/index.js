import { Router } from 'express';

import authRouter from './auth.js';
import router from './contacts.js';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);

rootRouter.use('/contacts', router);

export default rootRouter;
