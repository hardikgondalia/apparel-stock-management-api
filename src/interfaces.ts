export interface ApparelSize {
  size: string;
  quantity: number;
  price: number;
}

export interface Apparel {
  code: string;
  sizes: ApparelSize[];
}

export interface OrderItem {
  code: string;
  size: string;
  quantity: number;
}

export interface Order {
  items: OrderItem[];
}

export interface ItemAvailability {
  available: number;
  item: OrderItem;
}

export interface EnhancedFulfillmentResult {
  canFulfill: boolean;
  unfulfilledItems: ItemAvailability[];
}

export interface UpdateApparelStockResult {
  success: boolean;
  message: string;
}

export interface UpdateMultipleApparelStocks {
  code: string;
  size: string;
  quantity: number;
  price: number;
}

export interface UpdateMultipleApparelStocksResult {
  code: string;
  size: string;
  success: boolean;
  message?: string;
}