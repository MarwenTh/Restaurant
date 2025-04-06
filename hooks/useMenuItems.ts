import { MenuItem } from "@/interface";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useUser from "./useUser";

// this hook is used to fetch menu items of the current seller who is logged in
const useMenuItems = () => {
  const [data, setData] = useState<{
    menuItems: MenuItem[] | null;
    loading: boolean;
    error: string | null;
  }>({
    menuItems: null,
    loading: true,
    error: null,
  });

  const { user } = useUser();
  const id = user?._id;

  const fetchMenuItems = useCallback(async () => {
    if (!id) return;
    try {
      setData((prev) => ({ ...prev, loading: true }));

      const response = await axios.get(`/api/menuItem?seller=${id}`);
      const result = await response.data;

      if (response.status !== 200) {
        throw new Error(result.error || "Failed to fetch menu items");
      }

      setData({
        menuItems: result.menuItems || null,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setData({
        menuItems: null,
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
