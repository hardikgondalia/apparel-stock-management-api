import { Router } from 'express';
import { apparelController } from '../controllers/apparel.controller';

const router = Router();

router.put('/:code', apparelController.updateApparelStock);
router.put('/', apparelController.updateMultipleApparelStocks);
router.get('/', apparelController.getAllApparels);
router.get('/:code', apparelController.getApparelByCode);

export default router;