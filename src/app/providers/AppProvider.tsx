import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { ErrorBoundary } from "./ErrorBoundary";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <Toaster
              position="top-center"
              toastOptions={{ className: "w-[90%] max-w-md font-normal" }}
            />
            {children}
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
