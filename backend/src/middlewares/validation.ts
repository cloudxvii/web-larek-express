import { celebrate, Joi, Segments } from 'celebrate';

import { orderSchema } from '../schemas/orderSchema';
import { productSchema } from '../schemas/productSchema';

export const validateProduct = celebrate({
  [Segments.BODY]: productSchema,
});

export const validateOrder = celebrate({
  [Segments.BODY]: orderSchema,
});

export const validateId = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
});
