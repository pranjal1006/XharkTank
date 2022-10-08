import Joi from 'joi';

export const offerSchema = Joi.object({
  investor: Joi.string().required(),
  amount: Joi.number().required(),
  equity: Joi.number().min(0).max(100).required(),
  comment: Joi.string().required(),
});