import { Order } from "@/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type OrderState = {
  order: Order | null;
  isLoading: boolean;
  error: string | null;
  setOrder: (order: Order) => void;
  clearOrder: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
};

const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      order: null,
      isLoading: false,
      error: null,
      setOrder: (order: Order) => set({ order, error: null }),
      clearOrder: () => set({ order: null, error: null, isLoading: false }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error, isLoading: false }),
    }),
    {
      name: "order-store",
    },
  ),
);

export default useOrderStore;
