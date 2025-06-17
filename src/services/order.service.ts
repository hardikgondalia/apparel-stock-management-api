import { dataStore } from "../utils/dataStore";
import { OrderItem } from "../interfaces";

export const orderService = {
  checkOrderFulfillment: async (items: OrderItem[]): Promise<boolean> => {
    return dataStore.canFulfillOrder(items);
  },

  getLowestOrderCost: async (items: OrderItem[]): Promise<number | null> => {
    return dataStore.getLowestOrderCost(items);
  },
};
