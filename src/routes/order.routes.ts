import { Router } from 'express';
import { orderController } from '../controllers/order.controller';

const router = Router();

router.post('/check-fulfill', orderController.checkOrderFulfillment);
router.post('/lowest-cost', orderController.getLowestOrderCost);

export default router;