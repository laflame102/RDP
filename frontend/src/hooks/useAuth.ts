import { authAPI } from "@/lib/api";
import { LoginData, RegisterData, User } from "@/types/auth";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const AUTH_KEYS = {
  profile: ["auth", "profile"] as const,
};

export function useAuth() {
  return useQuery<User, AxiosError>({
    queryKey: AUTH_KEYS.profile,
    queryFn: authAPI.getProfile,
    retry: (failureCount, error) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterData) => authAPI.register(data),
    onSuccess: (response) => {
      queryClient.setQueryData(AUTH_KEYS.profile, response.user);
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginData) => authAPI.login(data),
    onSuccess: (response) => {
      queryClient.setQueryData(AUTH_KEYS.profile, response.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useRefreshTokens() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.refreshTokens,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
    },
  });
}

export function useIsAuthenticated() {
  const { data: user, isLoading } = useAuth();

  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  };
}
