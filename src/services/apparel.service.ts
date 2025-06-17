import { dataStore } from "../utils/dataStore";
import { Apparel, ApparelSize } from "../interfaces";

export const apparelService = {
  updateApparelStock: async (
    code: string,
    size: string,
    quantity: number,
    price: number
  ): Promise<boolean> => {
    return dataStore.updateApparel(code, size, quantity, price);
  },

  updateMultipleApparelStocks: async (
    updates: { code: string; size: string; quantity: number; price: number }[]
  ): Promise<boolean> => {
    return dataStore.updateMultipleApparels(updates);
  },

  getAllApparels: async (): Promise<Apparel[]> => {
    return dataStore.getApparels();
  },

  getApparelByCode: async (code: string): Promise<Apparel | undefined> => {
    return dataStore.getApparelByCode(code);
  },
};
