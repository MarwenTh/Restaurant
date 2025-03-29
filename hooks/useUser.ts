import { User } from "@/interface";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

const useUser = () => {
  const [data, setData] = useState<{
    user: User | null;
    loading: boolean;
    error: string | null;
  }>({
    user: null,
    loading: true,
    error: null,
  });
  const { data: session } = useSession();
  const email = session?.user?.email!;

  const fetchUser = useCallback(async () => {
    if (!email) return;

    try {
      setData((prev) => ({ ...prev, loading: true }));

      const response = await fetch(`/api/user?email=${email}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch user");
      }

      setData({
        user: result.users || null,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setData({
        user: null,
        loading: false,
        error: error.message,
      });
    }
  }, [email]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { ...data, refetch: fetchUser };
};

export default useUser;
