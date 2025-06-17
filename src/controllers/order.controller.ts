import { RequestHandler } from 'express';
import { orderService } from '../services/order.service';

export const orderController = {
    checkOrderFulfillment: (async (req, res, next) => {
        try {
            const items = req.body.items;
            
            if (!Array.isArray(items)) {
                return res.status(400).json({ message: 'Expected an array of order items' });
            }
            
            const canFulfill = await orderService.checkOrderFulfillment(items);
            return res.json({ canFulfill });
        } catch (error) {
            next(error);
        }
    }) as RequestHandler,
    
    getLowestOrderCost: (async (req, res, next) => {
        try {
            const items = req.body.items;
            
            if (!Array.isArray(items)) {
                return res.status(400).json({ message: 'Expected an array of order items' });
            }
            
            const lowestCost = await orderService.getLowestOrderCost(items);
            
            if (lowestCost !== null) {
                return res.json({ lowestCost });
            }
            return res.status(400).json({ message: 'Order cannot be fulfilled' });
        } catch (error) {
            next(error);
        }
    }) as RequestHandler
};