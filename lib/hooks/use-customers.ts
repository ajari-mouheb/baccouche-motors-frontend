import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as customersApi from "@/lib/api/customers-api";
import type { AuthUser } from "@/lib/auth-context";

export const customersKeys = {
  all: ["customers"] as const,
  me: () => [...customersKeys.all, "me"] as const,
};

export function useCustomerMe() {
  return useQuery({
    queryKey: customersKeys.me(),
    queryFn: customersApi.getMe,
  });
}

export function useUpdateMe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updates: Partial<Pick<AuthUser, "name" | "phone" | "address">>) =>
      customersApi.updateMe(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customersKeys.me() });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => customersApi.changePassword(currentPassword, newPassword),
  });
}
