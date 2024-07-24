"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TanstackProvider = ({ children }) => {
  const [queryClient] = useState(new QueryClient(
    {
      defaultOptions: {
        queries: {
          staleTime: 1000 * 6,
          refetchInterval: 1000 * 6,
        },
      },
    
    }
  ));
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackProvider;
