import { Joi } from 'celebrate';

export const orderSchema = Joi.object({
  payment: Joi.string().valid('card', 'online').required().messages({
    'any.only': 'Payment must be "card" or "online"',
    'any.required': 'Payment is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Phone is required',
  }),
  address: Joi.string().min(1).required().messages({
    'string.empty': 'Address cannot be empty',
    'any.required': 'Address is required',
  }),
  total: Joi.number().min(0).required().messages({
    'number.min': 'Total must be a positive number',
    'any.required': 'Total is required',
  }),
  items: Joi.array().items(Joi.string().hex().length(24)).min(1).required()
    .messages({
      'array.min': 'Items must contain at least one product',
      'any.required': 'Items are required',
      'string.hex': 'Product ID must be a valid hex string',
      'string.length': 'Product ID must be 24 characters long',
    }),
});
