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
