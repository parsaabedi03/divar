import { createContext, useContext, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentUserRequest, type AuthenticatedUser } from "@/features/auth/api/user.api";
import { getCookie } from "@/shared/utils/cookieHelpers";

interface AuthContextValue {
  user: AuthenticatedUser | undefined;
  isLoading: boolean;
  refreshUser: () => Promise<unknown>;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const currentUserKey = ["auth", "current-user"] as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const hasAccessToken = Boolean(getCookie("accessToken"));
  const { data: user, isLoading, refetch } = useQuery({
    queryKey: currentUserKey,
    queryFn: getCurrentUserRequest,
    enabled: hasAccessToken,
    retry: false,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: hasAccessToken && isLoading,
        refreshUser: async () => (await refetch()).data,
        clearUser: () => queryClient.removeQueries({ queryKey: currentUserKey }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
