import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getOAuthUrlController,
  loginUserController,
  loginWithGoogleController,
  logoutUserController,
  refreshUserController,
  registerUserController,
  requestResetPasswordTokenController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../widdlewares/validateBody.js';
import { registerUserSchemaValidation } from '../validation/registerUserSchemaValidation.js';
import { loginUserSchemaValidation } from '../validation/loginUserSchemaValidation.js';
import { requestResetPasswordTokenValidationSchema } from '../validation/requestResetPasswordTokenSchema.js';
import { resetPasswordSchema } from '../validation/resetPasswordSchema.js';
import { loginWithGoogleOAuthSchema } from '../validation/auth.js';

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

authRouter.post('/refresh', ctrlWrapper(refreshUserController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetPasswordTokenValidationSchema),
  ctrlWrapper(requestResetPasswordTokenController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.get('/oauth-url', ctrlWrapper(getOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default authRouter;
