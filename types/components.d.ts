// Tipos para componentes React

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  orderType: "delivery" | "takeaway" | "dine-in";
  paymentMethod: "cash" | "card" | "transfer";
  notes: string;
  tableId: number | null;
}

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  customizations: string[];
  image?: string;
  preparationTime?: number;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image?: string;
  preparationTime?: number;
  available?: boolean;
}

export interface Order {
  id: number;
  createdAt: Date;
  notes: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  orderType: string;
  locationId: string;
  status: string;
  paymentMethod: string;
  totalAmount: string;
  estimatedDeliveryTime: string;
  tableId: number | null;
  paymentStatus: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  unitPrice: string;
  customizations: string[];
  createdAt: Date;
  itemPrice?: string;
  subtotal?: string;
}

export interface Table {
  id: number;
  locationId: string;
  tableNumber: number;
  seats: number;
  status: string;
  qrCode?: string;
  qrCodeUrl?: string;
}

export interface Reservation {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  createdAt: Date;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

export interface NavigationItem {
  href: string;
  label: string;
  isRoute?: boolean;
}

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning';
}

export interface KitchenFiltersType {
  all: string;
  received: string;
  preparing: string;
  ready: string;
  delivered: string;
} 