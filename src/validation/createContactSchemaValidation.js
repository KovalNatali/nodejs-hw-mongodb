import Joi from 'joi';

export const createContactSchemaValidation = Joi.object({
  name: Joi.string().required().min(2).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 2 symbols',
    'string.max': 'Name must be less than 20 symbols',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().required().min(2).max(20),
  email: Joi.string().email().min(2).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(2)
    .max(20)
    .valid('work', 'home', 'personal')
    .default('personal'),
});
