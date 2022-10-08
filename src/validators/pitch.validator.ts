import Joi from 'joi';

export const pitchSchema = Joi.object({
  entrepreneur: Joi.string().required(),
  pitchTitle: Joi.string().required(),
  pitchIdea: Joi.string().required(),
  askAmount: Joi.number().required(),
  equity: Joi.number().min(0).max(100).required(),
});