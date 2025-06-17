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
