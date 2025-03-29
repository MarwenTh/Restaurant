import { User, UseUsersResponse } from "@/interface";
import { useState, useEffect, useCallback } from "react";

const useUsers = (page: number = 1, limit: number = 6): UseUsersResponse => {
  const [data, setData] = useState<Omit<UseUsersResponse, "refetch">>({
    users: [],
    totalUsers: 0,
    loading: true,
    error: null,
  });

  const fetchUsers = useCallback(async () => {
    try {
      setData((prev) => ({ ...prev, loading: true }));

      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const url = `/api/user?${params.toString()}`;
      const response = await fetch(url);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch users");
      }

      setData({
        users: result.users || [],
        totalUsers: result.totalUsers || 0,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setData({
        users: [],
        totalUsers: 0,
        loading: false,
        error: error.message,
      });
    }
  }, [page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { ...data, refetch: fetchUsers };
};

export default useUsers;
