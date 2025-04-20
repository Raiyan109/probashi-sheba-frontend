"use client"

import {  QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from "./get-query-client";

const queryClient = getQueryClient()
// const queryClient = new QueryClient()


export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )

}

// export default Providers