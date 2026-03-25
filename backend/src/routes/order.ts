import { Router } from 'express';

import { validateOrder } from '../middlewares/validation';

import postOrder from '../controllers/order';

const router = Router();

router.post('/', validateOrder, postOrder);

export default router;
