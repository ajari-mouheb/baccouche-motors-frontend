"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth-context";
import { queryClient } from "@/lib/query-client";
import { ErrorBoundary } from "@/components/error-boundary";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster richColors position="top-center" closeButton />
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
