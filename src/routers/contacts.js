import { Router } from 'express';
import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../widdlewares/isValidId.js';
import { validateBody } from '../widdlewares/validateBody.js';
import { createContactSchemaValidation } from '../validation/createContactSchemaValidation.js';
import { updateContactSchemaValidation } from '../validation/updateContactSchemaValidation.js';
import { authenticate } from '../widdlewares/authenticate.js';
import { upload } from '../widdlewares/upload.js';

const router = Router();

router.use('/:contactId', isValidId('contactId'));

router.use('/', authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchemaValidation),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactSchemaValidation),
  ctrlWrapper(patchContactController),
);

router.put(
  '/:contactId',
  validateBody(createContactSchemaValidation),
  ctrlWrapper(upsertContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

export default router;
