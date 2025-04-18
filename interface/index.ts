export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
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
}

export interface Category {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
