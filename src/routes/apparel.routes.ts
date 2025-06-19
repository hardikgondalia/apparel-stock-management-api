import { Router } from 'express';
import { apparelController } from '../controllers/apparel.controller';

const router = Router();

router.put('/code/:code/size/:size', apparelController.updateApparelStock);
router.put('/code/:code/size/:size/upsert', apparelController.addOrUpdateApparel);
router.put('/bulk-update', apparelController.updateMultipleApparelStocks);
router.get('/', apparelController.getAllApparels);
router.get('/:code', apparelController.getApparelByCode);

export default router;