import { useCallback, useEffect, useState } from "react";

// Simplified user profile hook - accepts userId and fetches basic profile
export function useUserProfile(userId?: string) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/users/${userId}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed to fetch user");
      setData(json.user || json);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetchUser();
  }, [userId, fetchUser]);

  return {
    user: data,
    loading,
    error,
    refetch: fetchUser,
    isReady: Boolean(userId),
  };
}
