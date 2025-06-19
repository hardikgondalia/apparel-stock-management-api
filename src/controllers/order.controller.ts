import { RequestHandler } from "express";
import { orderService } from "../services/order.service";
import { getMessage } from "../utils/messageUtil";

export const orderController = {
  checkOrderFulfillment: (async (req, res, next) => {
    try {
      const items = req.body.items;

      if (!Array.isArray(items)) {
        return res.status(400).json({
          message: getMessage("checkOrderFulfillmentIsArray"),
        });
      }

      const { canFulfill, unfulfilledItems } =
        await orderService.checkOrderFulfillment(items);

      return res.json({
        canFulfill,
        unfulfilledItems: canFulfill ? [] : unfulfilledItems,
      });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  getLowestOrderCost: (async (req, res, next) => {
    try {
      const items = req.body.items;

      if (!Array.isArray(items)) {
        return res
          .status(400)
          .json({ message: getMessage("checkOrderFulfillmentIsArray") });
      }

      const lowestCost = await orderService.getLowestOrderCost(items);

      if (lowestCost !== null) {
        return res.json({ lowestCost });
      }
      return res
        .status(400)
        .json({ message: getMessage("orderCannotBeFulfilled") });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
};
