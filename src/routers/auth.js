import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../widdlewares/validateBody.js';
import { registerUserSchemaValidation } from '../validation/registerUserSchemaValidation.js';
import { loginUserSchemaValidation } from '../validation/loginUserSchemaValidation.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchemaValidation),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchemaValidation),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh-session', ctrlWrapper(refreshUserController));

export default authRouter;
