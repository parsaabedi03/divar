import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import { ErrorBoundary } from "./ErrorBoundary";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <Toaster
            position="top-center"
            toastOptions={{ className: "w-[90%] max-w-md font-normal" }}
          />
          {children}
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
