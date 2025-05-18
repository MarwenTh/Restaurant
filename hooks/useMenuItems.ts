import { MenuItem, UseMenuItemsResponse } from "@/interface";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useUser from "./useUser";

// this hook is used to fetch all menu items
const useMenuItems = (): UseMenuItemsResponse => {
  const [data, setData] = useState<Omit<UseMenuItemsResponse, "refetch">>({
    menuItems: [],
    totalMenuItems: 0,
    loading: true,
    error: null,
  });

  const { user } = useUser();
  const id = user?._id;

  const fetchMenuItems = useCallback(async () => {
    if (!id) return;
    try {
      setData((prev) => ({ ...prev, loading: true }));

      const response = await axios.get(`/api/menu-item?seller=${id}`);
      const result = await response.data;

      if (response.status !== 200) {
        throw new Error(result.error || "Failed to fetch menu items");
      }

      setData({
        menuItems: result.menuItems || [],
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
  }, [id]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  return { ...data, refetch: fetchMenuItems };
};

export default useMenuItems;
