import { MenuItem, UseMenuItemsResponse } from "@/interface";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useUser from "./useUser";

// this hook is used to fetch all the menu items from the database
const useFood = () => {
  const [data, setData] = useState<Omit<UseMenuItemsResponse, "refetch">>({
    menuItems: [],
    totalMenuItems: 0,
    loading: true,
    error: null,
  });

  const fetchFood = useCallback(async () => {
    try {
      setData((prev) => ({ ...prev, loading: true }));

      const response = await axios.get(`/api/menu-item`);
      const result = await response.data;

      if (response.status !== 200) {
        throw new Error(result.error || "Failed to fetch menu items");
      }

      setData({
        menuItems: result.allMenuItems || [],
        totalMenuItems: result.totalMenuItems || 0,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setData({
        menuItems: [],
        totalMenuItems: 0,
        loading: false,
        error: error.message || "An error occurred",
      });
    }
  }, []);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  return { ...data, refetch: fetchFood };
};

export default useFood;
