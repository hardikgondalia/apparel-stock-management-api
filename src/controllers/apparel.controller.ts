import { RequestHandler } from 'express';
import { apparelService } from '../services/apparel.service';

export const apparelController = {
    updateApparelStock: (async (req, res, next) => {
        try {
            const { code } = req.params;
            const { size, quantity, price } = req.body;
            
            if (!size || quantity === undefined || price === undefined) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            
            const success = await apparelService.updateApparelStock(code, size, quantity, price);
            
            if (success) {
                return res.json({ message: 'Apparel stock updated successfully' });
            }
            return res.status(404).json({ message: 'Apparel not found' });
        } catch (error) {
            next(error);
        }
    }) as RequestHandler,
    
    updateMultipleApparelStocks: (async (req, res, next) => {
        try {
            const updates = req.body;
            
            if (!Array.isArray(updates)) {
                return res.status(400).json({ message: 'Expected an array of updates' });
            }
            
            const success = await apparelService.updateMultipleApparelStocks(updates);
            
            if (success) {
                return res.json({ message: 'All apparel stocks updated successfully' });
            }
            return res.status(404).json({ message: 'One or more apparel items not found' });
        } catch (error) {
            next(error);
        }
    }) as RequestHandler,
    
    getAllApparels: (async (req, res, next) => {
        try {
            const apparels = await apparelService.getAllApparels();
            return res.json(apparels);
        } catch (error) {
            next(error);
        }
    }) as RequestHandler,
    
    getApparelByCode: (async (req, res, next) => {
        try {
            const { code } = req.params;
            const apparel = await apparelService.getApparelByCode(code);
            
            if (apparel) {
                return res.json(apparel);
            }
            return res.status(404).json({ message: 'Apparel not found' });
        } catch (error) {
            next(error);
        }
    }) as RequestHandler
};