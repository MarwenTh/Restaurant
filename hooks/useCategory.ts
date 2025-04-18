import { MenuItem, UseCategoryResponse } from "@/interface";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useUser from "./useUser";

// this hook is used to fetch all the categories from the database
const useCategory = () => {
  const [data, setData] = useState<Omit<UseCategoryResponse, "refetch">>({
    categories: [],
    totalCategories: 0,
    loading: true,
    error: null,
  });

  const fetchCategories = useCallback(async () => {
    try {
      setData((prev) => ({ ...prev, loading: true }));
      const response = await axios.get(`/api/category`);
      const result = await response.data;

      if (response.status !== 200) {
        throw new Error(result.error || "Failed to fetch menu items");
      }

      setData({
        categories: result.category || [],
        totalCategories: result.totalCategories || 0,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setData({
        categories: [],
        totalCategories: 0,
        loading: false,
        error: error.message || "An error occurred",
      });
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { ...data, refetch: fetchCategories };
};

export default useCategory;
