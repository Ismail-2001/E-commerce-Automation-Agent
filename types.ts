export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastSold?: string;
}

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Returned';
  date: string;
  items: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export type ViewState = 'dashboard' | 'inventory' | 'orders' | 'agent' | 'settings';

export interface SalesData {
  name: string;
  sales: number;
  revenue: number;
}