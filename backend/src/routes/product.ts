import { Router } from 'express';

import { validateProduct } from '../middlewares/validation';
import { getProducts, postProducts } from '../controllers/product';

const router = Router();

router.get('/', getProducts);
router.post('/', validateProduct, postProducts);

export default router;
