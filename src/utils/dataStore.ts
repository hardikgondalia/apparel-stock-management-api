import fs from "fs";
import path from "path";
import {
  Apparel,
  EnhancedFulfillmentResult,
  ItemAvailability,
  OrderItem,
  UpdateApparelStockResult,
  UpdateMultipleApparelStocks,
  UpdateMultipleApparelStocksResult,
} from "../interfaces";
import { getMessage } from "./messageUtil";

const DATA_FILE = path.join(__dirname, "../../apparel-stock.json");

function readData(): Apparel[] {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeData(data: Apparel[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export const dataStore = {
  getApparels: (): Apparel[] => readData(),

  getApparelByCode: (code: string): Apparel | undefined => {
    const apparels = readData();
    return apparels.find((a) => a.code === code);
  },

  updateApparelStock: (
    code: string,
    size: string,
    quantity: number,
    price: number
  ): UpdateApparelStockResult => {
    const apparels = readData();
    const apparelIndex = apparels.findIndex((a) => a.code === code);

    if (apparelIndex === -1) {
      return { success: false, message: getMessage("apparelNotFound") };
    }

    const sizeIndex = apparels[apparelIndex].sizes.findIndex(
      (s) => s.size === size
    );

    if (sizeIndex === -1) {
      return { success: false, message: getMessage("sizeNotAvailable") };
    }

    apparels[apparelIndex].sizes[sizeIndex] = { size, quantity, price };
    writeData(apparels);

    return { success: true, message: "stockUpdated" };
  },

  addOrUpdateApparel: (
    code: string,
    size: string,
    quantity: number,
    price: number
  ): UpdateApparelStockResult => {
    const apparels = readData();
    const apparelIndex = apparels.findIndex((a) => a.code === code);

    if (apparelIndex === -1) {
      apparels.push({
        code,
        sizes: [{ size, quantity, price }],
      });
      writeData(apparels);
      return { success: true, message: "apparelCreated" };
    }

    const sizeIndex = apparels[apparelIndex].sizes.findIndex(
      (s) => s.size === size
    );

    if (sizeIndex === -1) {
      apparels[apparelIndex].sizes.push({ size, quantity, price });
    } else {
      apparels[apparelIndex].sizes[sizeIndex] = { size, quantity, price };
    }

    writeData(apparels);
    return { success: true, message: getMessage("stockUpdated") };
  },

  updateMultipleApparels: (
    updates: UpdateMultipleApparelStocks[]
  ): {
    success: boolean;
    results: Array<UpdateMultipleApparelStocksResult>;
  } => {
    const apparels = readData();
    const results: Array<UpdateMultipleApparelStocksResult> = [];
    let anySuccess = false;

    updates.forEach((update) => {
      const apparelIndex = apparels.findIndex((a) => a.code === update.code);

      if (apparelIndex === -1) {
        results.push({
          code: update.code,
          size: update.size,
          success: false,
          message: getMessage("apparelNotFound"),
        });
        return;
      }

      const sizeIndex = apparels[apparelIndex].sizes.findIndex(
        (s) => s.size === update.size
      );

      if (sizeIndex === -1) {
        apparels[apparelIndex].sizes.push({
          size: update.size,
          quantity: update.quantity,
          price: update.price,
        });
        anySuccess = true;
        results.push({
          code: update.code,
          size: update.size,
          success: true,
          message: getMessage("sizeAdded"),
        });
      } else {
        apparels[apparelIndex].sizes[sizeIndex] = {
          size: update.size,
          quantity: update.quantity,
          price: update.price,
        };
        anySuccess = true;
        results.push({
          code: update.code,
          size: update.size,
          success: true,
          message: getMessage("stockUpdated"),
        });
      }
    });

    if (anySuccess) {
      writeData(apparels);
    }

    return {
      success: anySuccess,
      results,
    };
  },

  canFulfillOrder: (orderItems: OrderItem[]): EnhancedFulfillmentResult => {
    const apparels = readData();
    let canFulfill = true;
    const unfulfilledItems: ItemAvailability[] = [];

    orderItems.forEach((item) => {
      const apparel = apparels.find((a) => a.code === item.code);
      if (!apparel) {
        canFulfill = false;
        unfulfilledItems.push({ item, available: 0 });
        return;
      }

      const size = apparel.sizes.find((s) => s.size === item.size);
      if (!size || size.quantity < item.quantity) {
        canFulfill = false;
        unfulfilledItems.push({
          item,
          available: size ? size.quantity : 0,
        });
      }
    });

    return { canFulfill, unfulfilledItems };
  },

  getLowestOrderCost: (orderItems: OrderItem[]): number | null => {
    const apparels = readData();
    let totalCost = 0;

    for (const item of orderItems) {
      const apparel = apparels.find((a) => a.code === item.code);
      if (!apparel) return null;

      const size = apparel.sizes.find((s) => s.size === item.size);
      if (!size || size.quantity < item.quantity) return null;

      totalCost += size.price * item.quantity;
    }

    return totalCost;
  },
};
