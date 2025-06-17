import fs from "fs";
import path from "path";
import { Apparel, OrderItem } from "../interfaces";

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

  updateApparel: (
    code: string,
    size: string,
    quantity: number,
    price: number
  ): boolean => {
    const apparels = readData();
    const apparelIndex = apparels.findIndex((a) => a.code === code);

    if (apparelIndex === -1) return false;

    const sizeIndex = apparels[apparelIndex].sizes.findIndex(
      (s) => s.size === size
    );

    if (sizeIndex === -1) {
      apparels[apparelIndex].sizes.push({ size, quantity, price });
    } else {
      apparels[apparelIndex].sizes[sizeIndex] = { size, quantity, price };
    }

    writeData(apparels);
    return true;
  },

  updateMultipleApparels: (
    updates: { code: string; size: string; quantity: number; price: number }[]
  ): boolean => {
    const apparels = readData();
    let allUpdated = true;

    updates.forEach((update) => {
      const apparelIndex = apparels.findIndex((a) => a.code === update.code);

      if (apparelIndex === -1) {
        allUpdated = false;
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
      } else {
        apparels[apparelIndex].sizes[sizeIndex] = {
          size: update.size,
          quantity: update.quantity,
          price: update.price,
        };
      }
    });

    if (allUpdated) {
      writeData(apparels);
    }

    return allUpdated;
  },

  canFulfillOrder: (orderItems: OrderItem[]): boolean => {
    const apparels = readData();

    return orderItems.every((item) => {
      const apparel = apparels.find((a) => a.code === item.code);
      if (!apparel) return false;

      const size = apparel.sizes.find((s) => s.size === item.size);
      return size && size.quantity >= item.quantity;
    });
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
