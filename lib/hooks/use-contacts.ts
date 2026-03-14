import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as contactsApi from "@/lib/api/contacts-api";
import type { Contact } from "@/lib/types";

export const contactsKeys = {
  all: ["contacts"] as const,
  list: (params?: { page?: number; limit?: number }) =>
    [...contactsKeys.all, "list", params] as const,
  stats: () => [...contactsKeys.all, "stats"] as const,
  detail: (id: string) => [...contactsKeys.all, "detail", id] as const,
};

export function useContacts(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: contactsKeys.list(params),
    queryFn: () => contactsApi.list(params),
    select: (res) => res.data,
  });
}

export function useContactStats() {
  return useQuery({
    queryKey: contactsKeys.stats(),
    queryFn: contactsApi.getStats,
  });
}

export function useContactById(id: string) {
  return useQuery({
    queryKey: contactsKeys.detail(id),
    queryFn: () => contactsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactsKeys.all });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Pick<Contact, "read">>;
    }) => contactsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: contactsKeys.all });
      queryClient.invalidateQueries({ queryKey: contactsKeys.detail(id) });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: contactsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactsKeys.all });
    },
  });
}
