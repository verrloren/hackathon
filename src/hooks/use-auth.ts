import { useQuery } from "@tanstack/react-query";
import { getAuthSession } from "@/modules/auth/auth-actions";

export const useAuth = () => {
  const { data: auth, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: getAuthSession,
  });

  return {
    userId: auth?.userId ?? '',
    isAuthenticated: auth?.isAuthenticated ?? false,
    user: auth?.user ?? null,
    isLoading
  };
};
