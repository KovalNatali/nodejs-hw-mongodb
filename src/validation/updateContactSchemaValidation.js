import Joi from 'joi';

export const updateContactSchemaValidation = Joi.object({
  name: Joi.string().min(2).max(20),
  phoneNumber: Joi.string().min(2).max(20),
  email: Joi.string().email().min(2).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(2)
    .max(20)
    .valid('work', 'home', 'personal')
    .default('personal'),
});
