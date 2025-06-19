import { dataStore } from "../utils/dataStore";
import {
  Apparel,
  UpdateApparelStockResult,
  UpdateMultipleApparelStocks,
  UpdateMultipleApparelStocksResult,
} from "../interfaces";

export const apparelService = {
  updateApparelStock: async (
    code: string,
    size: string,
    quantity: number,
    price: number
  ): Promise<UpdateApparelStockResult> => {
    return dataStore.updateApparelStock(code, size, quantity, price);
  },

  addOrUpdateApparel: async (
    code: string,
    size: string,
    quantity: number,
    price: number
  ): Promise<UpdateApparelStockResult> => {
    return dataStore.addOrUpdateApparel(code, size, quantity, price);
  },

  updateMultipleApparelStocks: async (
    updates: UpdateMultipleApparelStocks[]
  ): Promise<{
    success: boolean;
    results: Array<UpdateMultipleApparelStocksResult>;
  }> => {
    return dataStore.updateMultipleApparels(updates);
  },

  getAllApparels: async (): Promise<Apparel[]> => {
    return dataStore.getApparels();
  },

  getApparelByCode: async (code: string): Promise<Apparel | undefined> => {
    return dataStore.getApparelByCode(code);
  },
};
