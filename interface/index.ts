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

export interface MenuItem {
  name: string;
  seller: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  calories?: number;
  ingredients: string[];
  allergens?: string[];
  dietaryInfo?: {
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
  };
  isAvailable: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  preparationTime?: number; // In minutes
  createdAt: Date;
  updatedAt: Date;
}
