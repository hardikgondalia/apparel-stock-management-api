import { RequestHandler } from "express";
import { apparelService } from "../services/apparel.service";
import { getMessage } from "../utils/messageUtil";

export const apparelController = {
  updateApparelStock: (async (req, res, next) => {
    try {
      const { code, size } = req.params;
      const { quantity, price } = req.body;

      if (!size || quantity === undefined || price === undefined) {
        return res.status(400).json({
          message: "missingRequiredFields",
        });
      }

      const { success, message } = await apparelService.updateApparelStock(
        code,
        size,
        quantity,
        price
      );

      if (success) {
        return res.json({ message: getMessage(message) });
      }

      return res.status(404).json({
        message: getMessage(message),
        details:
          message === getMessage("sizeNotAvailable")
            ? `Size ${size} not available for product ${code}`
            : `Product ${code} not found`,
      });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  addOrUpdateApparel: (async (req, res, next) => {
    try {
      const { code, size } = req.params;
      const { quantity, price } = req.body;

      if (!size || quantity === undefined || price === undefined) {
        return res.status(400).json({
          message: getMessage("missingRequiredFields"),
        });
      }

      const { success, message } = await apparelService.addOrUpdateApparel(
        code,
        size,
        quantity,
        price
      );

      const statusCode = message === getMessage("apparelCreated") ? 201 : 200;
      return res.status(statusCode).json({
        message: message,
        details:
          message === getMessage("apparelCreated")
            ? `New product ${code} with size ${size} created`
            : `Stock for ${code} size ${size} updated`,
      });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,

  updateMultipleApparelStocks: (async (req, res, next) => {
    try {
      const updates = req.body;

      if (!Array.isArray(updates)) {
        return res.status(400).json({
          message: getMessage("checkOrderFulfillmentIsArray"),
        });
      }

      const { success, results } =
        await apparelService.updateMultipleApparelStocks(updates);

      const detailedResults = results.map((result) => ({
        code: result.code,
        size: result.size,
        message: result.message ? getMessage(result.message) : undefined,
        details: result.success
          ? `Stock for ${result.code} size ${result.size} updated`
          : result.message === "apparelNotFound"
          ? `Product ${result.code} not found`
          : `Unknown error with ${result.code} size ${result.size}`,
      }));

      if (success) {
        return res.json({
          success: true,
          message: getMessage("bulkUpdateSuccess"),
          results: detailedResults,
        });
      }

      return res.status(207).json({
        success: false,
        message: getMessage("bulkUpdatePartial"),
        results: detailedResults,
      });
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
      return res.status(404).json({ message: getMessage("apparelNotFound") });
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
};
