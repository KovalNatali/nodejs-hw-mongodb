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
import { updateContactSchemaValidation } from '../validation/UpdateContactSchemaValidation.js';

const router = Router();

router.use('/contacts/:contactId', isValidId('contactId'));

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  validateBody(createContactSchemaValidation),
  ctrlWrapper(createContactController),
);

router.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchemaValidation),
  ctrlWrapper(patchContactController),
);

router.put(
  '/contacts/:contactId',
  validateBody(createContactSchemaValidation),
  ctrlWrapper(upsertContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactByIdController));

export default router;
