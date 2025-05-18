export interface User {
  _id: string;
  email: string;
  name: string;
  role: "Admin" | "Client" | "Seller" | "Delivery";
  image?: string;
  verified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  contactInfo?: {
    phone: string;
    email: string;
    website?: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  // Seller specific properties
  description?: string;
  cuisine?: string[];
  businessHours?: {
    day: string;
    open: string;
    close: string;
    isClosed: boolean;
  }[];
  priceRange?: "low" | "medium" | "high";
  deliveryOptions?: {
    delivery: boolean;
    pickup: boolean;
    dineIn: boolean;
  };
}

export interface UseUsersResponse {
  users: User[];
  totalUsers: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseMenuItemsResponse {
  menuItems: MenuItem[];
  totalMenuItems: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  hasMore?: boolean;
  loadMore?: () => Promise<void>;
}

export interface UseCategoryResponse {
  categories: Category[];
  totalCategories: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface MenuItem {
  _id: string;
  name: string;
  seller?: User;
  description?: string;
  price: number;
  category: Array<string>;
  deliveryTime?: string;
  rating?: number;
  reviews?: number;
  image: string;
  calories?: number;
  ingredients?: string[];
  allergens?: string[];
  dietaryInfo?: {
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
  };
  isAvailable?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  preparationTime?: number; // In minutes
  createdAt?: Date;
  updatedAt?: Date;
  popularity: number;
  status: "available" | "out_of_stock" | "hidden";
  discount?: number;
  isDiscounted?: boolean;
}

export interface Category {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  client: string; // Reference to User (client)
  seller: string; // Reference to Restaurant
  items: {
    menuItem: MenuItem; // Reference to MenuItem
    quantity: number;
    unitPrice: number;
    specialInstructions?: string;
  }[];
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "in-delivery"
    | "delivered"
    | "cancelled";
  totalAmount: number;
  deliveryFee?: number;
  tip?: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    specialInstructions?: string;
  };
  deliveryType?: "delivery" | "pickup" | "dine-in";
  scheduledFor?: Date; // For scheduled delivery/pickup
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  driver?: string; // Reference to User (driver)
  refundInfo?: {
    amount: number;
    reason: string;
    date: Date;
  };
  promoCodeApplied?: string;
  discountAmount?: number;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
}

export interface Review {
  _id: string;
  Seller: User; // Reference to Restaurant
  client: User; // Reference to User (client)
  rating: number;
  comment: string;
  images?: string[];
  orderRef?: Order; // Optional reference to Order
  status: "published" | "flagged" | "rejected";
  response?: {
    responder: User; // Reference to User (seller or admin)
    text: string;
    date: Date;
  };
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Promo {
  _id: string;
  code: string;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}
